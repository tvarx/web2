import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../src/App";
import { buildSeo, buildExerciseSeo, getExercisesIndex, getSportsData, listSeo, faPathSlug, exerciseBasePath } from "../src/sports/data";
import { setExerciseDetails } from "../src/sports/details";
import { SITE_BASE_URL } from "../src/sports/env";
import type { JsonLdItem, Lang } from "../src/sports/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist");

const esc = (s: string | number | undefined) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function attrs(obj: Record<string, string | number | undefined>) {
  return Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}="${esc(v)}"`)
    .join(" ");
}

function scrubHead(inner: string): string {
  let s = inner;
  s = s.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "");
  s = s.replace(/<meta[^>]*(?:name|property)="(?:description|keywords|robots|og:[^"]*|twitter:[^"]*)"[^>]*>/gi, "");
  s = s.replace(/<link[^>]*rel="canonical"[^>]*>/gi, "");
  s = s.replace(/<link[^>]*rel="alternate"[^>]*>/gi, "");
  return s.trim();
}

interface HeadInput {
  title: string;
  description: string;
  keywords?: string[];
  canonical: string;
  hreflang: { en: string; fa: string; "x-default": string };
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  jsonLd?: JsonLdItem[];
}

function buildHeadTags(input: HeadInput): string {
  const parts: string[] = [];
  parts.push(`<title>${esc(input.title)}</title>`);
  parts.push(`<meta name="robots" content="index, follow" />`);
  parts.push(`<meta name="description" content="${esc(input.description)}" />`);
  if (input.keywords?.length) parts.push(`<meta name="keywords" content="${esc(input.keywords.join(", "))}" />`);
  parts.push(`<link rel="canonical" href="${esc(input.canonical)}" />`);
  for (const [hl, href] of Object.entries(input.hreflang)) {
    parts.push(`<link rel="alternate" ${attrs({ hreflang: hl, href })} />`);
  }
  const ogTitle = input.ogTitle || input.title;
  const ogDesc = input.ogDescription || input.description;
  const ogImage = input.ogImage || `${SITE_BASE_URL}/logo.png`;
  const ogType = input.ogType || "article";
  const ogUrl = input.ogUrl || input.canonical;
  parts.push(`<meta property="og:title" content="${esc(ogTitle)}" />`);
  parts.push(`<meta property="og:description" content="${esc(ogDesc)}" />`);
  parts.push(`<meta property="og:image" content="${esc(ogImage)}" />`);
  parts.push(`<meta property="og:type" content="${esc(ogType)}" />`);
  parts.push(`<meta property="og:url" content="${esc(ogUrl)}" />`);
  parts.push(`<meta property="og:locale" content="${esc(ogUrl.startsWith(`${SITE_BASE_URL}/fa` ) ? "fa_IR" : "en_US")}" />`);
  parts.push(`<meta property="og:site_name" content="TvarX" />`);
  parts.push(`<meta name="twitter:card" content="summary_large_image" />`);
  parts.push(`<meta name="twitter:title" content="${esc(ogTitle)}" />`);
  parts.push(`<meta name="twitter:description" content="${esc(ogDesc)}" />`);
  parts.push(`<meta name="twitter:image" content="${esc(ogImage)}" />`);
  for (const item of input.jsonLd ?? []) {
    parts.push(`<script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(item)}</script>`);
  }
  return parts.join("\n  ");
}

function injectHead(html: string, tags: string): string {
  const m = html.match(/(<head>)([\s\S]*?)(<\/head>)/);
  if (!m) return html;
  const [, open, inner, close] = m;
  const scrubbed = scrubHead(inner);
  return html.slice(0, m.index + open.length) + scrubbed + (scrubbed ? "\n  " : "") + tags + "\n  " + html.slice(m.index + open.length + inner.length);
}

function injectBody(html: string, body: string): string {
  const m = html.match(/(<div\s+id="root"[^>]*>)([\s\S]*?)(<\/div>)/);
  if (!m) return html;
  const [, open, , close] = m;
  return html.slice(0, m.index + open.length) + body + html.slice(m.index + open.length + m[2].length);
}

function renderPage(pathname: string): string {
  return renderToString(
    React.createElement(MemoryRouter, { initialEntries: [pathname] }, React.createElement(AppRoutes))
  );
}

function detailHead(detail: ReturnType<typeof getSportsData>["category_details"][string] | ReturnType<typeof getSportsData>["muscle_details"][string], lang: Lang): HeadInput {
  const seo = buildSeo(detail, lang);
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: seo.canonical,
    hreflang: seo.hreflang,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
    ogImage: seo.ogImage,
    ogType: seo.ogType,
    ogUrl: seo.ogUrl,
    jsonLd: seo.jsonLd,
  };
}

function listHead(lang: Lang): HeadInput {
  const seo = listSeo(lang);
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: seo.canonical,
    hreflang: seo.hreflang,
    ogType: "website",
    ogUrl: seo.canonical,
  };
}

function exerciseHead(ex: ReturnType<typeof getExercisesIndex>[number], lang: Lang): HeadInput {
  const seo = buildExerciseSeo(ex, lang);
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: seo.canonical,
    hreflang: seo.hreflang,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
    ogImage: seo.ogImage,
    ogType: seo.ogType,
    ogUrl: seo.ogUrl,
    jsonLd: seo.jsonLd,
  };
}

function writeFile(rel: string, content: string) {
  const abs = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function main() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    console.error("dist/index.html not found — run `npm run build` first.");
    process.exit(1);
  }
  const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
  const data = getSportsData();
  const lastmod = (data.fetched_at || "").slice(0, 10);

  // Preload the code-split sports pages and the heavy exercise rich-text module
  // so renderToString outputs full content instead of the Suspense fallback.
  await import("../src/sports/pages/SportsDetail");
  await import("../src/sports/pages/ExercisePage");
  const exerciseDetails = (await import("../src/generated/exercises-details")).default as Record<string, unknown>;
  setExerciseDetails(exerciseDetails);

  const jobs: { pathname: string; out: string; head: HeadInput }[] = [];

  jobs.push({ pathname: "/sports", out: "sports/index.html", head: listHead("fa") });
  jobs.push({ pathname: "/en/sports", out: "en/sports/index.html", head: listHead("en") });

  for (const c of data.categories) {
    const detail = data.category_details[c.slug.en];
    for (const lang of ["fa", "en"] as Lang[]) {
      const slug = lang === "fa" ? faPathSlug(c.slug.en) : c.slug.en;
      jobs.push({
        pathname: `/${lang}/sports/${encodeURIComponent(slug)}`,
        out: `${lang === "fa" ? "fa" : "en"}/sports/${slug.replace(/[/\\]/g, "-")}/index.html`,
        head: detailHead(detail, lang),
      });
    }
  }
  for (const m of data.muscles) {
    const detail = data.muscle_details[m.slug.en];
    for (const lang of ["fa", "en"] as Lang[]) {
      const slug = lang === "fa" ? faPathSlug(m.slug.en) : m.slug.en;
      jobs.push({
        pathname: `/${lang}/sports/${encodeURIComponent(slug)}`,
        out: `${lang === "fa" ? "fa" : "en"}/sports/${slug.replace(/[/\\]/g, "-")}/index.html`,
        head: detailHead(detail, lang),
      });
    }
  }

  for (const ex of getExercisesIndex()) {
    for (const lang of ["fa", "en"] as Lang[]) {
      const base = exerciseBasePath(lang);
      const slug = lang === "fa" ? ex.slug.fa || ex.slug.en : ex.slug.en;
      jobs.push({
        pathname: `${base}/${encodeURIComponent(slug)}`,
        out: `${lang === "fa" ? "fa" : "en"}/sports/exercises/${slug.replace(/[/\\]/g, "-")}/index.html`,
        head: exerciseHead(ex, lang),
      });
    }
  }

  let rendered = 0;
  for (const job of jobs) {
    const body = renderPage(job.pathname);
    const head = buildHeadTags(job.head);
    let html = injectHead(template, head);
    html = injectBody(html, body);
    writeFile(job.out, html);
    rendered++;
  }

  // Legacy fa URLs: previously the fa site used English slugs
  // (/sports/exercises/barbell-curl). Write slim canonical redirects so old
  // bookmarks and links still work and signal the new Persian URL to Google.
  let legacy = 0;
  for (const ex of getExercisesIndex()) {
    const slugFa = ex.slug.fa || ex.slug.en;
    const target = `${SITE_BASE_URL}/sports/exercises/${encodeURIComponent(slugFa)}`;
    const out = `fa/sports/exercises/${ex.slug.en.replace(/[/\\]/g, "-")}/index.html`;
    const html = `<!doctype html>
<html lang="fa">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="canonical" href="${target}">
<title>${escapeHtml(ex.name.fa || ex.name.en)} | TvarX</title>
</head>
<body>
<p>This page has moved: <a href="${target}">${target}</a></p>
<script>location.replace(${JSON.stringify(target)});</script>
</body>
</html>
`;
    writeFile(out, html);
    legacy++;
  }

  writeSitemap(data, lastmod);
  writeRobots();

  console.log(`Prerendered ${rendered} sports pages + ${legacy} legacy redirects into ${DIST} (+ sitemap.xml, robots.txt)`);
  console.log(`SITE_BASE_URL = ${SITE_BASE_URL}`);
}

function writeRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_BASE_URL}/sitemap.xml
`;
  writeFile("robots.txt", robots);
}

function writeSitemap(data: ReturnType<typeof getSportsData>, lastmod: string) {
  const entries: { loc: string; lastmod?: string; priority: string; changefreq: string; alternates: { hl: string; href: string }[] }[] = [];

  entries.push({ loc: `${SITE_BASE_URL}/`, priority: "1.0", changefreq: "daily", alternates: [] });
  for (const lang of ["fa", "en"] as Lang[]) {
    entries.push({ loc: `${SITE_BASE_URL}/${lang}`, priority: "0.9", changefreq: "weekly", alternates: [] });
    for (const page of ["about", "privacy", "terms"]) {
      entries.push({ loc: `${SITE_BASE_URL}/${lang}/${page}`, priority: "0.6", changefreq: "monthly", alternates: [] });
    }
  }

  const mkAlternates = (lang: Lang, slugEn: string, slugFa: string) => [
    { hl: "en", href: `${SITE_BASE_URL}/en/sports/${encodeURIComponent(slugEn)}` },
    { hl: "fa", href: `${SITE_BASE_URL}/fa/sports/${encodeURIComponent(slugFa)}` },
    { hl: "x-default", href: `${SITE_BASE_URL}/en/sports/${encodeURIComponent(slugEn)}` },
  ];

  for (const lang of ["fa", "en"] as Lang[]) {
    const loc = lang === "fa" ? `${SITE_BASE_URL}/sports` : `${SITE_BASE_URL}/en/sports`;
    const alternates = [
      { hl: "en", href: `${SITE_BASE_URL}/en/sports` },
      { hl: "fa", href: `${SITE_BASE_URL}/sports` },
      { hl: "x-default", href: `${SITE_BASE_URL}/en/sports` },
    ];
    entries.push({ loc, lastmod, priority: "0.9", changefreq: "daily", alternates });
  }

  for (const c of data.categories) {
    entries.push({ loc: `${SITE_BASE_URL}/en/sports/${encodeURIComponent(c.slug.en)}`, lastmod, priority: "0.8", changefreq: "weekly", alternates: mkAlternates("en", c.slug.en, c.slug.fa) });
    entries.push({ loc: `${SITE_BASE_URL}/fa/sports/${encodeURIComponent(faPathSlug(c.slug.en))}`, lastmod, priority: "0.8", changefreq: "weekly", alternates: mkAlternates("fa", c.slug.en, c.slug.fa) });
  }
  for (const m of data.muscles) {
    entries.push({ loc: `${SITE_BASE_URL}/en/sports/${encodeURIComponent(m.slug.en)}`, lastmod, priority: "0.8", changefreq: "weekly", alternates: mkAlternates("en", m.slug.en, m.slug.fa) });
    entries.push({ loc: `${SITE_BASE_URL}/fa/sports/${encodeURIComponent(faPathSlug(m.slug.en))}`, lastmod, priority: "0.8", changefreq: "weekly", alternates: mkAlternates("fa", m.slug.en, m.slug.fa) });
  }

  const exAlternates = (slugEn: string, slugFa: string) => [
    { hl: "en", href: `${SITE_BASE_URL}/en/sports/exercises/${encodeURIComponent(slugEn)}` },
    { hl: "fa", href: `${SITE_BASE_URL}/sports/exercises/${encodeURIComponent(slugFa)}` },
    { hl: "x-default", href: `${SITE_BASE_URL}/en/sports/exercises/${encodeURIComponent(slugEn)}` },
  ];
  for (const ex of getExercisesIndex()) {
    const slugEn = ex.slug.en;
    const slugFa = ex.slug.fa || ex.slug.en;
    entries.push({ loc: `${SITE_BASE_URL}/en/sports/exercises/${encodeURIComponent(slugEn)}`, lastmod, priority: "0.7", changefreq: "weekly", alternates: exAlternates(slugEn, slugFa) });
    entries.push({ loc: `${SITE_BASE_URL}/sports/exercises/${encodeURIComponent(slugFa)}`, lastmod, priority: "0.7", changefreq: "weekly", alternates: exAlternates(slugEn, slugFa) });
  }

  const urlXml = (e: (typeof entries)[0]) => {
    const parts = [`<loc>${esc(e.loc)}</loc>`];
    if (e.lastmod) parts.push(`<lastmod>${esc(e.lastmod)}</lastmod>`);
    parts.push(`<changefreq>${esc(e.changefreq)}</changefreq>`);
    parts.push(`<priority>${esc(e.priority)}</priority>`);
    for (const a of e.alternates) {
      parts.push(`<xhtml:link rel="alternate" ${attrs({ hreflang: a.hl, href: a.href })} />`);
    }
    return `  <url>${parts.map((p) => (p.startsWith("<xhtml") ? p : `\n    ${p}`)).join("")}\n  </url>`;
  };

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(urlXml).join("\n")}
</urlset>
`;
  writeFile("sitemap.xml", xml);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});