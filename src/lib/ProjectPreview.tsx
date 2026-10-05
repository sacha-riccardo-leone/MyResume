import { useEffect, useRef, useState } from "react";
import type { Media } from "../portfolio/media";
import type { Theme } from "./theme";

/* The live preview inside an opened CV card: the project's own landing
   animation, linking to the site.

   Cheap until wanted: nothing is fetched while the card has never been
   opened (the whole card body is hidden then), the video loads on the first
   open, plays only while the card is open and on screen, and pauses when it
   closes. Reduced motion gets the still poster. */
export default function ProjectPreview({
  media,
  name,
  href,
  theme,
  active,
}: {
  media: Media;
  name: string;
  href?: string;
  theme: Theme;
  /** the card is open */
  active: boolean;
}) {
  const box = useRef<HTMLAnchorElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(active);   // true from the first open on
  const [visible, setVisible] = useState(false);
  const calm = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const clip = theme === "dark" && media.videoDark ? media.videoDark : media.video;
  const still = theme === "dark" && media.videoDark ? media.videoDark.poster : (media.shot ?? clip?.poster);

  useEffect(() => { if (active) setArmed(true); }, [active]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (active && visible) v.play().catch(() => {});
    else v.pause();
  }, [active, visible, armed, clip]);

  return (
    <a
      ref={box}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="group relative block overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      style={{ aspectRatio: "16 / 10" }}
    >
      {armed && clip && !calm ? (
        <video key={clip.webm} ref={video} poster={clip.poster} muted loop playsInline preload="metadata"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]">
          <source src={clip.webm} type="video/webm" />
          <source src={clip.mp4} type="video/mp4" />
        </video>
      ) : armed && still ? (
        <img src={still} alt="" loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
      ) : null}
    </a>
  );
}
