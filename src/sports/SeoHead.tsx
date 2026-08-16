import React, { useEffect } from "react";
import type { HreflangMap, JsonLdItem, Lang } from "./types";

interface SeoHeadProps {
  lang: Lang;
  title: string;
  description: string;
  keywords?: string[];
  canonical: string;
  hreflang?: HreflangMap;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  jsonLd?: JsonLdItem[];
  siteName?: string;
}

const JSONLD_ATTR = "data-seo-jsonld";

function upsert(selector: string, create: () => HTMLElement, set: (el: HTMLElement) => void) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  set(el as HTMLElement);
}

/**
 * Client-side SEO manager for sports pages. Injected meta/link/title tags
 * mirror what the build-time prerender writes into static HTML, so dynamic
 * navigation and crawler-served HTML stay consistent.
 */
export function SeoHead({
  lang,
  title,
  description,
  keywords,
  canonical,
  hreflang,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  ogUrl,
  jsonLd,
  siteName = "TvarX",
}: SeoHeadProps) {
  useEffect(() => {
    document.title = title;
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");

    const meta = (name: string, content: string) => {
      upsert(
        `meta[name="${name}"]`,
        () => {
          const m = document.createElement("meta");
          m.setAttribute("name", name);
          return m;
        },
        (el) => el.setAttribute("content", content)
      );
    };
    const prop = (property: string, content: string) => {
      if (!content) return;
      upsert(
        `meta[property="${property}"]`,
        () => {
          const m = document.createElement("meta");
          m.setAttribute("property", property);
          return m;
        },
        (el) => el.setAttribute("content", content)
      );
    };
    const link = (rel: string, href: string, extra?: Record<string, string>) => {
      upsert(
        `link[rel="${rel}"]${extra?.hreflang ? `[hreflang="${extra.hreflang}"]` : ""}`,
        () => {
          const l = document.createElement("link");
          l.setAttribute("rel", rel);
          if (extra) {
            for (const [k, v] of Object.entries(extra)) l.setAttribute(k, v);
          }
          return l;
        },
        (el) => el.setAttribute("href", href)
      );
    };

    meta("description", description);
    if (keywords && keywords.length) meta("keywords", keywords.join(", "));
    meta("robots", "index, follow");

    link("canonical", canonical);

    if (hreflang) {
      link("alternate", hreflang.en, { hreflang: "en" });
      link("alternate", hreflang.fa, { hreflang: "fa" });
      link("alternate", hreflang["x-default"], { hreflang: "x-default" });
    } else {
      document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((l) => l.remove());
    }

    prop("og:title", ogTitle || title);
    prop("og:description", ogDescription || description);
    prop("og:image", ogImage || "");
    prop("og:type", ogType);
    prop("og:url", ogUrl || canonical);
    prop("og:locale", lang === "fa" ? "fa_IR" : "en_US");
    prop("og:site_name", siteName);

    meta("twitter:card", "summary_large_image");
    meta("twitter:title", ogTitle || title);
    meta("twitter:description", ogDescription || description);
    if (ogImage) meta("twitter:image", ogImage);

    document
      .querySelectorAll(`script[type="application/ld+json"][${JSONLD_ATTR}]`)
      .forEach((s) => s.remove());
    for (const item of jsonLd ?? []) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute(JSONLD_ATTR, "true");
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
    }
  }, [
    lang,
    title,
    description,
    keywords,
    canonical,
    hreflang,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    ogUrl,
    jsonLd,
    siteName,
  ]);

  return null;
}

export default SeoHead;