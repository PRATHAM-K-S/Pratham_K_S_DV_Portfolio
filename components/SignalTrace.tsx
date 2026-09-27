"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const CHAMFER = 24;
/** Scroll distance (px) over which each horizontal crossing is drawn. */
const CROSSING_WINDOW = 90;
const CONTAINER_WIDTH = 1152;
/** How far down the viewport the signal head sits. */
const HEAD_VIEWPORT_RATIO = 0.62;

type Knot = { x: number; y: number; t: number; len: number };
type Via = { x: number; y: number; t: number };
type Geometry = { width: number; height: number; d: string; total: number; knots: Knot[]; vias: Via[] };

function offsetWithin(el: HTMLElement, root: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

function buildGeometry(root: HTMLElement): Geometry | null {
  const sections = Array.from(root.querySelectorAll<HTMLElement>("main > section"));
  if (sections.length < 2) return null;
  const source = root.querySelector<HTMLElement>("[data-trace-source]");

  const width = root.clientWidth;
  const height = root.scrollHeight;
  const inset = Math.max((width - CONTAINER_WIDTH) / 2, 0);
  const left = inset > 64 ? inset / 2 : 12;
  const right = width - left;
  const boundaries = sections.slice(1).map((s) => s.offsetTop);
  const last = sections[sections.length - 1];
  const endY = last.offsetTop + last.offsetHeight - 48;

  const points: { x: number; y: number; t?: number }[] = [];
  const vias: Via[] = [];
  let side = width / 2;
  const startY = source
    ? offsetWithin(source, root) + source.offsetHeight
    : boundaries[0] - CROSSING_WINDOW;
  let lastT = startY;
  points.push({ x: side, y: startY, t: startY });
  vias.push({ x: side, y: startY, t: startY });

  boundaries.forEach((b, k) => {
    const target = k % 2 === 0 ? left : right;
    const dir = Math.sign(target - side);
    // Shrink the window when the gap above is short so scroll positions stay increasing.
    const w = Math.min(CROSSING_WINDOW, (b - lastT) * 0.8);
    points.push({ x: side, y: b - CHAMFER, t: b - w });
    points.push({ x: side + dir * CHAMFER, y: b });
    points.push({ x: target - dir * CHAMFER, y: b });
    points.push({ x: target, y: b + CHAMFER, t: b + w });
    vias.push({ x: (side + target) / 2, y: b, t: b });
    side = target;
    lastT = b + w;
  });
  points.push({ x: side, y: endY, t: endY });
  vias.push({ x: side, y: endY, t: endY });

  const knots: Knot[] = [];
  let len = 0;
  points.forEach((p, i) => {
    if (i > 0) len += Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y);
    knots.push({ x: p.x, y: p.y, t: p.t ?? Number.NaN, len });
  });
  // Points inside a crossing get scroll positions spread by path length.
  knots.forEach((k, i) => {
    if (!Number.isNaN(k.t)) return;
    let a = i - 1;
    while (Number.isNaN(knots[a].t)) a--;
    let b = i + 1;
    while (Number.isNaN(knots[b].t)) b++;
    k.t = knots[a].t + ((k.len - knots[a].len) / (knots[b].len - knots[a].len)) * (knots[b].t - knots[a].t);
  });

  const d = knots.map((k, i) => `${i ? "L" : "M"} ${k.x.toFixed(1)} ${k.y.toFixed(1)}`).join(" ");
  return { width, height, d, total: len, knots, vias };
}

function locate(knots: Knot[], t: number) {
  if (t <= knots[0].t) return { len: 0, x: knots[0].x, y: knots[0].y };
  for (let i = 1; i < knots.length; i++) {
    const b = knots[i];
    if (t <= b.t) {
      const a = knots[i - 1];
      const f = (t - a.t) / (b.t - a.t || 1);
      return { len: a.len + f * (b.len - a.len), x: a.x + f * (b.x - a.x), y: a.y + f * (b.y - a.y) };
    }
  }
  const end = knots[knots.length - 1];
  return { len: end.len, x: end.x, y: end.y };
}

/** A PCB-style signal trace routed down the page that draws itself as you scroll. */
export default function SignalTrace({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const viaRefs = useRef<(SVGCircleElement | null)[]>([]);
  const geoRef = useRef<Geometry | null>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);

  const update = useCallback(() => {
    const root = rootRef.current;
    const geo = geoRef.current;
    if (!geo || !root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rootTop = root.getBoundingClientRect().top + window.scrollY;
    const t = reduced
      ? Number.POSITIVE_INFINITY
      : window.scrollY + window.innerHeight * HEAD_VIEWPORT_RATIO - rootTop;
    const { len, x, y } = locate(geo.knots, t);
    const offset = String(geo.total - len);
    if (lineRef.current) lineRef.current.style.strokeDashoffset = offset;
    if (glowRef.current) glowRef.current.style.strokeDashoffset = offset;
    if (headRef.current) {
      headRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      headRef.current.style.opacity = len > 0 && !reduced ? "1" : "0";
    }
    viaRefs.current.forEach((el, i) => el?.classList.toggle("is-lit", geo.vias[i].t <= t));
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => setGeo(buildGeometry(root));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    geoRef.current = geo;
    viaRefs.current.length = geo?.vias.length ?? 0;
    update();
  }, [geo, update]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  return (
    <div ref={rootRef} className="relative isolate flex-1">
      {children}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-70 md:opacity-100"
      >
        {geo ? (
          <>
            <svg width={geo.width} height={geo.height} className="absolute top-0 left-0">
              <path d={geo.d} fill="none" stroke="#1e293b" strokeWidth={1.5} strokeDasharray="4 6" />
              <path
                ref={glowRef}
                d={geo.d}
                fill="none"
                stroke="#34d399"
                strokeOpacity={0.14}
                strokeWidth={8}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={geo.total}
              />
              <path
                ref={lineRef}
                d={geo.d}
                fill="none"
                stroke="#34d399"
                strokeOpacity={0.85}
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={geo.total}
              />
              {geo.vias.map((via, i) => (
                <circle
                  key={`${via.x}-${via.y}`}
                  ref={(el) => {
                    viaRefs.current[i] = el;
                  }}
                  cx={via.x}
                  cy={via.y}
                  r={5}
                  strokeWidth={1.5}
                  className="trace-via"
                />
              ))}
            </svg>
            <div
              ref={headRef}
              className="absolute top-0 left-0 -mt-[5px] -ml-[5px] h-2.5 w-2.5 rounded-full bg-emerald-300 opacity-0 shadow-[0_0_14px_4px_rgba(52,211,153,0.55)] will-change-transform"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60 motion-reduce:hidden" />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
