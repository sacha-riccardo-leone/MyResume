import { useEffect, useState } from "react";
import { SmoothCursor } from "../components/ui/smooth-cursor";

/* The custom pointer, for the whole site rather than one view. Mounted once at
   the app root so it survives moving between the gate, the portfolio and the
   CV without restarting its spring.

   Two guards:
   - it only appears where a real pointer exists, so touch devices keep their
     native behaviour;
   - it only hides the native cursor while it is actually mounted, by toggling
     a class on <html>. If this component ever fails to render, the visitor is
     never left with no cursor at all. */
export default function CustomCursor() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setFine(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("cursor-custom", fine);
    return () => root.classList.remove("cursor-custom");
  }, [fine]);

  if (!fine) return null;
  return <SmoothCursor cursor={<SmallCursor />} />;
}

/* SmoothCursor's stock pointer sets its size with style={{ scale: 0.5 }}, which
   React serialises as `scale: 0.5px` — invalid, so it is dropped and the arrow
   renders at its full 50x54 rather than the intended 25. Sizing through the
   width/height attributes is immune to that, and the viewBox scales the
   artwork. Colours are theme tokens so the pointer inverts with the page. */
function SmallCursor() {
  return (
    <svg width={20} height={22} viewBox="0 0 50 54" fill="none">
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="var(--cursor-fill)"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
        stroke="var(--cursor-stroke)"
        strokeWidth={2.25825}
      />
    </svg>
  );
}
