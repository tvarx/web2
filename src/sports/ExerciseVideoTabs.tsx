import React, { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import type { ExerciseMedia, Bilingual, Lang } from "./types";
import { translations } from "../i18n/translations";

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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const computedLang: Lang =
    lang ?? (typeof document !== "undefined" && document.documentElement.lang === "fa" ? "fa" : "en");
  const t = tRef.current[computedLang];

  useEffect(() => {
    setActive((cur) => cur ?? views[0] ?? null);
  }, [views]);

  const available = views.filter((v) => v.video && !failed.has(v.video));
  const current = active && available.some((v) => v.video === active.video) ? active : available[0] ?? null;

  const markFailed = (url: string) => {
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
      <div className="relative bg-black rounded-2xl overflow-hidden border border-white/10">
        {current?.video ? (
          <video
            key={current.video}
            ref={videoRef}
            src={current.video}
            poster={current.image}
            controls
            preload="metadata"
            playsInline
            onError={() => markFailed(current.video)}
            className="w-full aspect-video object-contain bg-black"
          />
        ) : (
          <div className="w-full aspect-video relative bg-black flex items-center justify-center overflow-hidden">
            {active?.image ? (
              <img
                src={active.image}
                alt={name.en}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
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
        <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-[11px] font-medium text-zinc-300">
          {current
            ? `${current.gender === "male" ? t.sports.male : t.sports.female} — ${current.angle === "front" ? t.sports.frontView : t.sports.sideView}`
            : ""}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                  className="w-full aspect-video object-cover rounded-lg"
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