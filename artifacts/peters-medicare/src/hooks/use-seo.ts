import { useEffect } from "react";

const SITE_URL = "https://medicare-services-hub-1--derickasiimwe84.replit.app";

interface SEOOptions {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

export function useSEO({ title, description, canonical, ogImage }: SEOOptions) {
  useEffect(() => {
    document.title = title;

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical ?? SITE_URL);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    if (ogImage) {
      setMeta("property", "og:image", ogImage);
      setMeta("name", "twitter:image", ogImage);
    }

    setCanonical(canonical ?? SITE_URL);
  }, [title, description, canonical, ogImage]);
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setCanonical(url: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}
