import { useEffect } from "react";
import { useConference } from "@/config";

export function Seo() {
  const conf = useConference();
  useEffect(() => {
    document.title = conf.seo.title;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    const setOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", property); document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", conf.seo.description);
    setOg("og:title", conf.seo.title);
    setOg("og:description", conf.seo.description);
    if (conf.seo.ogImage) setOg("og:image", conf.seo.ogImage);
    setOg("og:type", "website");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", conf.seo.title);
    setMeta("twitter:description", conf.seo.description);
  }, [conf.seo]);
  return null;
}
