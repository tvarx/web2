import React, { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  lang: "fa" | "en";
  dir: "rtl" | "ltr";
  canonical?: string;
}

export function SEO({
  title,
  description,
  keywords,
  lang,
  dir,
  canonical
}: SEOProps) {
  useEffect(() => {
    // 1. Set document title
    document.title = title;

    // 2. Set html attributes
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);

    // 3. Helper to update/create meta tags in head
    const updateMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Description & Keywords
    updateMetaTag("name", "description", description);
    if (keywords) {
      updateMetaTag("name", "keywords", keywords);
    }

    // Open Graph
    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:locale", lang === "fa" ? "fa_IR" : "en_US");
    updateMetaTag("property", "og:type", "website");

    // Twitter Cards
    updateMetaTag("name", "twitter:title", title);
    updateMetaTag("name", "twitter:description", description);

    // 4. Update Canonical Link tag
    const canonicalUrl = canonical || window.location.href;
    let linkElement = document.querySelector(`link[rel="canonical"]`) as HTMLLinkElement;
    if (!linkElement) {
      linkElement = document.createElement("link");
      linkElement.setAttribute("rel", "canonical");
      document.head.appendChild(linkElement);
    }
    linkElement.setAttribute("href", canonicalUrl);

  }, [title, description, keywords, lang, dir, canonical]);

  // This is a utility side-effect component, it returns nothing visual.
  return null;
}

export default SEO;
