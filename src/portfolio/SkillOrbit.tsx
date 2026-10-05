import { useEffect, useRef } from "react";

/* ── Soft skills in orbit ─────────────────────────────────────────────────
   The skills travel round an ellipse; the ones passing in front grow and
   sharpen, the ones behind shrink and fade, so the flat ring reads as depth.

   The markup is a plain list: screen readers get the nine skills in order and
   never see the motion. Positions are written straight to the DOM on each
   frame (no React state), and the loop sleeps while the section is off screen.

   Two shapes, picked by width:
   - wide: a horizontal ring seen from slightly above, front = bottom.
   - narrow (phones): the long labels leave no room to swing sideways, so the
     ring stands up like a drum, front = right; the skills scroll past
     vertically instead of piling onto each other.

   Hover slows the ring to a stop (and back) rather than freezing it mid-frame.
   Reduced motion: the ring is laid out once and never turns. */

const PERIOD_S = 40;          // one full turn
const NARROW = 640;           // below this, the drum layout
const RX_MAX = 360;           // widest the ring gets on large screens

export default function SkillOrbit({ skills }: { skills: string[] }) {
  const stage = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const items = [...el.querySelectorAll<HTMLLIElement>("[data-orbit]")];
    const n = items.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, maxW = 0, sizes: [number, number][] = [];
    const measure = () => {
      W = el.clientWidth;
      H = el.clientHeight;
      sizes = items.map(i => [i.offsetWidth, i.offsetHeight]);
      maxW = Math.max(...sizes.map(s => s[0]));
    };

    let angle = -Math.PI / 2;  // start with the first skill at the back-centre
    let speed = 1;             // 0..1, eased toward target on hover
    let target = 1;
    let visible = true;
    let last = 0;
    let raf = 0;

    const place = () => {
      const narrow = W < NARROW;
      const cx = W / 2, cy = H / 2;
      // a compact ring: capped well inside the stage so the skills stay
      // close together, and the widest pill (at full scale) never clips
      const free = Math.max(0, (W - maxW * 1.05) / 2);
      const rx = Math.min(free, narrow ? free : RX_MAX);
      const ry = narrow ? H / 2 - 30 : H / 2 - 34;

      items.forEach((it, i) => {
        const t = angle + (i * 2 * Math.PI) / n;
        const x = cx + Math.cos(t) * rx;
        const y = cy + Math.sin(t) * ry;
        const z = ((narrow ? Math.cos(t) : Math.sin(t)) + 1) / 2;  // 0 back → 1 front
        const [w, h] = sizes[i];
        it.style.transform =
          `translate3d(${x - w / 2}px, ${y - h / 2}px, 0) scale(${0.7 + z * 0.35})`;
        it.style.opacity = String(0.3 + z * 0.7);
        it.style.zIndex = String(Math.round(z * 100));
      });
    };

    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      speed += (target - speed) * Math.min(1, dt * 4);
      if (target === 0 && speed < 0.01) speed = 0;  // settle, don't creep
      if (speed > 0) {
        angle += speed * dt * (2 * Math.PI / PERIOD_S);
        place();
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    const start = () => {
      if (reduce || raf) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    measure();
    place();

    // labels change width with the language and the font loading
    const ro = new ResizeObserver(() => { measure(); place(); });
    ro.observe(el);
    items.forEach(i => ro.observe(i));

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(el);

    const slow = () => { target = 0; };
    const resume = () => { target = 1; };
    el.addEventListener("pointerenter", slow);
    el.addEventListener("pointerleave", resume);

    start();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerenter", slow);
      el.removeEventListener("pointerleave", resume);
    };
  }, [skills]);

  return (
    <ul ref={stage} className="relative h-[26rem] sm:h-[21rem] overflow-hidden">
      {skills.map(s => (
        <li key={s} data-orbit
          className="absolute left-0 top-0 whitespace-nowrap rounded-full border border-[var(--pf-hair)] bg-[var(--pf-raise)] px-4 py-2 text-[13px] sm:px-5 sm:py-2.5 sm:text-[15px] text-[var(--pf-ink)] will-change-transform">
          {s}
        </li>
      ))}
    </ul>
  );
}
