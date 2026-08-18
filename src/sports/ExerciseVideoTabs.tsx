import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Loader2,
  Volume2,
  Volume1,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  PictureInPicture2,
  Gauge,
  AlertTriangle,
} from "lucide-react";
import type { ExerciseMedia, Bilingual, Lang } from "./types";
import { translations, type TranslationSchema } from "../i18n/translations";

export interface VideoView {
  gender: "male" | "female";
  angle: "front" | "side";
  image?: string;
  video?: string;
}

export function buildVideoViews(media: ExerciseMedia | null | undefined): VideoView[] {
  const out: VideoView[] = [];
  const push = (gender: "male" | "female", angle: "front" | "side") => {
    const v = media?.[gender]?.[angle];
    if (v?.video) out.push({ gender, angle, image: v.image, video: v.video });
  };
  push("male", "front");
  push("male", "side");
  push("female", "front");
  push("female", "side");
  return out;
}

export function posterFor(media: ExerciseMedia | null | undefined, gender: "male" | "female"): string {
  const pick = (g: "male" | "female") =>
    media?.[g]?.front?.image ||
    media?.[g]?.side?.image ||
    "";
  return pick(gender) || (gender === "male" ? pick("female") : pick("male"));
}

/* The exercise CDN serves MP4s with `Content-Disposition: attachment` and a
 * `binary/octet-stream` content type, which makes browsers download instead of
 * play inside <video>. Since the CDN allows CORS, refetch such media as a Blob
 * with an explicit video/mp4 type and play it from an internal blob: URL.
 */
const blobCache = new Map<string, string>();

async function blobUrlFor(url: string): Promise<string | null> {
  const hit = blobCache.get(url);
  if (hit) return hit;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) return null;
    const blob = await res.blob();
    const typed =
      blob.type === "video/mp4" || blob.type.startsWith("video/")
        ? blob
        : new Blob([blob], { type: "video/mp4" });
    const objectUrl = URL.createObjectURL(typed);
    blobCache.set(url, objectUrl);
    return objectUrl;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const VOLUME_KEY = "tvarx:player:volume";

function fmtTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/* ------------------------------------------------------------------ */
/*  Seek bar: buffered fill, playhead, drag-to-seek, hover preview     */
/* ------------------------------------------------------------------ */

function SeekBar({
  current,
  duration,
  buffered,
  onSeek,
}: {
  current: number;
  duration: number;
  buffered: number;
  onSeek: (t: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [hoverT, setHoverT] = useState<number | null>(null);

  const pct = (t: number) => (duration > 0 ? clamp01(t / duration) : 0);

  const valueFromEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    return clamp01((e.clientX - r.left) / r.width);
  };

  const handle = (e: React.PointerEvent<HTMLDivElement>) => {
    const v = valueFromEvent(e);
    if (dragging) onSeek(v * duration);
    setHoverT(v * duration);
  };

  const showT = dragging ? hoverT ?? current : hoverT ?? current;

  return (
    <div className="group/seek relative pt-1 pb-1.5" dir="ltr">
      <div
        ref={ref}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(current)}
        className="relative h-4 flex items-center cursor-pointer touch-none select-none"
        onPointerDown={(e) => {
          e.preventDefault();
          (e.currentTarget as HTMLDivElement).setPointerCapture?.(e.pointerId);
          setDragging(true);
          setHoverT(valueFromEvent(e) * duration);
          onSeek(valueFromEvent(e) * duration);
        }}
        onPointerMove={handle}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        <div className="absolute inset-x-0 h-1 rounded-full bg-white/15">
          <div className="absolute inset-y-0 left-0 rounded-full bg-zinc-400/40" style={{ width: `${pct(buffered) * 100}%` }} />
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A855F7]"
            style={{ width: `${pct(showT) * 100}%` }}
          />
        </div>
        <div
          className="absolute h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-transform group-hover/seek:scale-125"
          style={{ left: `${pct(showT) * 100}%` }}
        />
        {hoverT != null && dragging && (
          <div
            className="absolute -top-6 -translate-x-1/2 rounded-md bg-black/90 border border-white/10 px-1.5 py-0.5 text-[10px] font-medium text-white pointer-events-none"
            style={{ left: `${pct(hoverT) * 100}%` }}
          >
            {fmtTime(hoverT)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Volume slider (appears on hover)                                   */
/* ------------------------------------------------------------------ */

function VolumeBar({ volume, muted, onChange }: { volume: number; muted: boolean; onChange: (v: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const valueFromEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return volume;
    const r = el.getBoundingClientRect();
    return clamp01((e.clientX - r.left) / r.width);
  };
  const effective = muted ? 0 : volume;
  return (
    <div
      ref={ref}
      role="slider"
      aria-label="Volume"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(effective * 100)}
      className="hidden sm:flex items-center w-20 h-8 cursor-pointer touch-none select-none group/vol"
      onPointerDown={(e) => {
        e.preventDefault();
        (e.currentTarget as HTMLDivElement).setPointerCapture?.(e.pointerId);
        onChange(valueFromEvent(e));
      }}
      onPointerMove={(e) => {
        if (e.buttons === 1) onChange(valueFromEvent(e));
      }}
    >
      <div className="relative w-full h-1 rounded-full bg-white/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-white"
          style={{ width: `${effective * 100}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Custom player core                                                 */
/* ------------------------------------------------------------------ */

const RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

type PlayerStatus = "loading" | "ready" | "error";

function Player({
  view,
  name,
  t,
  onFail,
}: {
  view: VideoView;
  name: Bilingual<string>;
  t: TranslationSchema;
  onFail: (url: string) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  const [status, setStatus] = useState<PlayerStatus>("loading");
  const [waiting, setWaiting] = useState(false);
  const [paused, setPaused] = useState(true);
  const [ended, setEnded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [source, setSource] = useState<string | undefined>(view.video);
  const [blobTried, setBlobTried] = useState(false);
  const viewRef = useRef(view.video);
  useEffect(() => {
    viewRef.current = view.video;
  }, [view.video]);
  const [volume, setVolume] = useState<number>(() => {
    if (typeof window === "undefined") return 0.9;
    const v = Number(window.localStorage.getItem(VOLUME_KEY));
    return Number.isFinite(v) ? v : 0.9;
  });
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [fs, setFs] = useState(false);
  const [rateOpen, setRateOpen] = useState(false);

  const isFa = t.lang === "fa";

  /* Reset the source whenever the selected view changes. */
  useEffect(() => {
    setSource(view.video);
    setBlobTried(false);
  }, [view.video]);

  /* Keep the seekbar smooth with rAF while playing. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || paused) return;
    const tick = () => {
      setCurrent(v.currentTime);
      setBuffered(v.buffered.length ? v.buffered.end(v.buffered.length - 1) : 0);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, source]);

  /* Attempt autoplay whenever the source changes. */
  useEffect(() => {
    setStatus("loading");
    setPaused(true);
    setEnded(false);
    setCurrent(0);
    setDuration(0);
    setBuffered(0);
    const v = videoRef.current;
    if (!v || !source) return;
    v.play()
      .then(() => setPaused(false))
      .catch(() => setPaused(true));
  }, [source, attempt]);

  /* Fullscreen state sync (incl. Safari). */
  useEffect(() => {
    const onFs = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element };
      setFs(!!document.fullscreenElement || !!doc.webkitFullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFs);
    document.addEventListener("webkitfullscreenchange", onFs);
    return () => {
      document.removeEventListener("fullscreenchange", onFs);
      document.removeEventListener("webkitfullscreenchange", onFs);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || status === "error") return;
    if (v.paused || v.ended) {
      if (v.ended) v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [status]);

  const seek = useCallback((t: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = t;
    setCurrent(t);
  }, []);

  const setVolumeSafe = useCallback((next: number) => {
    const v = videoRef.current;
    if (!v) return;
    const vol = clamp01(next);
    setVolume(vol);
    setMuted(vol === 0);
    v.volume = vol;
    v.muted = vol === 0;
    if (typeof window !== "undefined") window.localStorage.setItem(VOLUME_KEY, String(vol));
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted || volume === 0) {
      v.muted = false;
      v.volume = Math.max(volume, 0.5);
      setVolume(Math.max(volume, 0.5));
      setMuted(false);
    } else {
      v.muted = true;
      setMuted(true);
    }
  }, [volume]);

  const toggleFullscreen = useCallback(() => {
    const el = wrapRef.current as HTMLElement & { webkitRequestFullscreen?: () => void };
    const doc = document as Document & { webkitFullscreenElement?: Element; webkitExitFullscreen?: () => void };
    if (document.fullscreenElement || doc.webkitFullscreenElement) {
      (document.exitFullscreen ?? doc.webkitExitFullscreen ?? (() => {})).call(document);
    } else {
      (el.requestFullscreen ?? el.webkitRequestFullscreen ?? (() => {})).call(el);
    }
  }, []);

  const togglePip = useCallback(() => {
    const v = videoRef.current;
    if (!v || typeof document === "undefined") return;
    if (document.pictureInPictureElement === v) {
      void v.exitPictureInPicture();
    } else {
      void v.requestPictureInPicture().catch(() => {});
    }
  }, []);

  const retry = () => setAttempt((n) => n + 1);

  const pipSupported =
    typeof document !== "undefined" && "pictureInPictureEnabled" in document && document.pictureInPictureEnabled;

  const showCenter = paused || ended;
  const label = `${view.gender === "male" ? t.sports.male : t.sports.female} — ${view.angle === "front" ? t.sports.frontView : t.sports.sideView}`;

  return (
    <div
      ref={wrapRef}
      dir="ltr"
      tabIndex={0}
      className="relative bg-black overflow-hidden outline-none"
    >
      <video
        key={`${source}-${attempt}`}
        ref={videoRef}
        src={source}
        poster={view.image}
        preload="auto"
        playsInline
        className="w-full aspect-video object-contain bg-black media-crop-bottom"
        onLoadStart={() => {
          setStatus("loading");
          setWaiting(false);
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onCanPlay={() => setStatus("ready")}
        onClick={togglePlay}
        onPlay={() => {
          setPaused(false);
          setEnded(false);
        }}
        onPause={() => setPaused(true)}
        onEnded={() => {
          setPaused(true);
          setEnded(true);
        }}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onError={() => {
          const direct = view.video;
          const fail = (url: string) => {
            setStatus("error");
            setWaiting(false);
            onFail(url);
          };
          if (direct && source === direct && !blobTried) {
            setBlobTried(true);
            setStatus("loading");
            blobUrlFor(direct).then((url) => {
              if (viewRef.current !== direct) return;
              if (url) setSource(url);
              else fail(direct);
            });
          } else {
            fail(direct ?? source ?? "");
          }
        }}
      />

      {/* buffering spinner */}
      {(status === "loading" || (waiting && !paused)) && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 pointer-events-none">
          <Loader2 className="w-10 h-10 text-[#A855F7] animate-spin" />
        </div>
      )}

      {/* poster + big play button when paused */}
      {showCenter && status !== "error" && (
        <button
          type="button"
          aria-label={isFa ? (ended ? "پخش دوباره" : "پخش") : ended ? "Replay" : "Play"}
          onClick={togglePlay}
          className="absolute inset-0 z-10 m-auto w-16 h-16 rounded-full bg-[#7C3AED]/80 backdrop-blur-md border border-white/20 shadow-2xl shadow-purple-500/30 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        >
          {ended ? (
            <RotateCcw className="w-7 h-7 text-white" />
          ) : (
            <Play className="w-7 h-7 text-white translate-x-[1px]" />
          )}
        </button>
      )}

      {/* unavailable / error state */}
      {status === "error" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center bg-black/70">
          <AlertTriangle className="w-8 h-8 text-amber-400" />
          <span className="text-sm text-zinc-300">{isFa ? "ویدیو در دسترس نیست" : "Video unavailable"}</span>
          <button
            type="button"
            onClick={retry}
            className="flex items-center gap-2 rounded-lg border border-[#A855F7]/40 bg-[#7C3AED]/15 px-3 py-1.5 text-xs font-medium text-[#C4B5FD] hover:bg-[#7C3AED]/25 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isFa ? "تلاش دوباره" : "Try again"}
          </button>
        </div>
      )}

      {/* video label chip */}
      <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-[11px] font-medium text-zinc-300">
        {label}
      </div>

      {/* control bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-3 pb-2 pt-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <SeekBar current={current} duration={duration} buffered={buffered} onSeek={seek} />
        <div className="flex items-center gap-0.5 text-white">
          <button
            type="button"
            aria-label={paused ? (isFa ? "پخش" : "Play") : isFa ? "توقف" : "Pause"}
            onClick={togglePlay}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            type="button"
            aria-label={isFa ? "صدا" : "Mute"}
            onClick={toggleMute}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            {muted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : volume < 0.5 ? (
              <Volume1 className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <VolumeBar volume={volume} muted={muted} onChange={(v) => setVolumeSafe(v)} />

          <span className="ml-1.5 text-[11px] font-medium text-zinc-300 tabular-nums">
            {fmtTime(current)} <span className="text-zinc-500">/ {fmtTime(duration || 0)}</span>
          </span>

          <span className="flex-1" />

          {/* playback rate */}
          <div className="relative">
            <button
              type="button"
              aria-label={isFa ? "سرعت پخش" : "Playback speed"}
              onClick={() => setRateOpen((o) => !o)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1"
            >
              <Gauge className="w-4 h-4" />
              <span className="text-[11px] font-semibold tabular-nums">{rate}x</span>
            </button>
            {rateOpen && (
              <div className="absolute bottom-10 right-0 rounded-xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-2xl shadow-black/60 p-1 min-w-[84px]">
                {RATES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      const v = videoRef.current;
                      if (v) v.playbackRate = r;
                      setRate(r);
                      setRateOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${
                      r === rate ? "text-[#C4B5FD] bg-[#7C3AED]/15" : "text-zinc-300 hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="tabular-nums">{r}x</span>
                    {r === rate && <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {pipSupported && (
            <button
              type="button"
              aria-label={isFa ? "تصویر در تصویر" : "Picture in picture"}
              onClick={togglePip}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors hidden sm:block"
            >
              <PictureInPicture2 className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            aria-label={isFa ? "تمام صفحه" : "Fullscreen"}
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            {fs ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tabs + player container                                            */
/* ------------------------------------------------------------------ */

interface Props {
  name: Bilingual<string>;
  media: ExerciseMedia | null | undefined;
  lang?: Lang;
  className?: string;
}

export function ExerciseVideoTabs({ name, media, lang, className = "" }: Props) {
  const tRef = useRef(translations);
  const views = buildVideoViews(media);
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<VideoView | null>(views[0] ?? null);

  const computedLang: Lang =
    lang ?? (typeof document !== "undefined" && document.documentElement.lang === "fa" ? "fa" : "en");
  const t = tRef.current[computedLang];

  useEffect(() => {
    setActive((cur) => cur ?? views[0] ?? null);
  }, [views]);

  const available = views.filter((v) => v.video && !failed.has(v.video));
  const current = active && available.some((v) => v.video === active.video) ? active : available[0] ?? null;

  const markFailed = (url: string) => {
    if (!url) return;
    setFailed((prev) => (prev.has(url) ? prev : new Set(prev).add(url)));
    if (active?.video === url) {
      const next = available.find((v) => v.video !== url);
      if (next) setActive(next);
    }
  };

  if (views.length === 0) {
    return (
      <div className={`w-full aspect-video rounded-2xl border border-white/10 bg-black flex flex-col items-center justify-center gap-3 ${className}`}>
        <Play className="w-10 h-10 text-zinc-700" />
        <span className="text-sm text-zinc-600">{computedLang === "fa" ? "ویدیوی این تمرین به‌زودی اضافه می‌شود" : "Video coming soon"}</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
        {current?.video ? (
          <Player view={current} name={name} t={t} onFail={markFailed} />
        ) : (
          <div className="w-full aspect-video relative bg-black flex items-center justify-center overflow-hidden">
            {active?.image ? (
              <img
                src={active.image}
                alt={name.en}
                className="absolute inset-0 w-full h-full object-cover opacity-30 media-crop-bottom"
              />
            ) : null}
            <div className="relative flex flex-col items-center gap-3 px-6 text-center">
              <Play className="w-10 h-10 text-zinc-600" />
              <span className="text-sm text-zinc-400">
                {computedLang === "fa" ? "ویدیو به‌زودی در دسترس قرار می‌گیرد" : "Video temporarily unavailable"}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2" dir={computedLang === "fa" ? "rtl" : "ltr"}>
        {views.map((view, i) => {
          const isFailed = !!view.video && failed.has(view.video);
          const selected = current?.video === view.video;
          return (
            <button
              key={i}
              onClick={() => setActive(view)}
              className={`flex flex-col gap-1.5 items-start rounded-xl border p-1.5 transition-all ${
                selected
                  ? "border-[#A855F7]/60 bg-[#7C3AED]/15"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              } ${isFailed ? "opacity-60" : ""}`}
            >
              {view.image ? (
                <img
                  src={view.image}
                  alt={`${name.en} ${view.gender} ${view.angle}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-video object-cover rounded-lg media-crop-bottom"
                />
              ) : (
                <span className="w-full aspect-video rounded-lg bg-white/5 flex items-center justify-center">
                  <Play className="w-5 h-5 text-zinc-500" />
                </span>
              )}
              <span className={`px-1 pb-0.5 text-[11px] font-medium ${selected ? "text-white" : "text-zinc-400"}`}>
                {t.lang === "fa"
                  ? `${view.gender === "male" ? t.sports.male : t.sports.female} — ${view.angle === "front" ? t.sports.frontView : t.sports.sideView}`
                  : `${view.gender === "male" ? t.sports.male : t.sports.female} · ${view.angle === "front" ? t.sports.frontView : t.sports.sideView}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}