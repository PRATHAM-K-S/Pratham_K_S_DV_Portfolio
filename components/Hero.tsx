import { ArrowRight, Mail } from "lucide-react";
import { heroWave, profile } from "@/lib/data";
import Reveal from "./Reveal";
import ViewerWindow from "./ViewerWindow";
import Waveform from "./Waveform";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-timegrid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]"
      />
      <WaferMap className="pointer-events-none absolute -top-40 -right-64 w-[720px] text-emerald-400 opacity-[0.07] sm:-right-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(40rem_22rem_at_35%_0%,rgba(16,185,129,0.12),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 sm:pt-40">
        <Reveal>
          <div className="max-w-3xl">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm">
              <span className="font-semibold text-slate-100">{profile.name}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">{profile.role}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                early career · exploring tech
              </span>
            </p>

            <h1 className="mt-6 text-4xl leading-[1.08] font-bold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
              Ensuring <span className="text-emerald-400">first-pass silicon</span> success
              through rigorous verification.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              I&apos;m a Design &amp; Verification Engineer. I build testbenches in
              SystemVerilog and UVM, protocol checkers in SVA, and Python regression scripts, so
              bugs are found in simulation instead of in silicon.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-emerald-400 hover:shadow-[0_0_30px_-6px_rgba(52,211,153,0.8)]"
              >
                View Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-emerald-500/50 hover:text-emerald-300"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Get in Touch
              </a>
            </div>
          </div>
        </Reveal>

        <div data-trace-source className="mt-16">
          <Reveal delay={200}>
            <ViewerWindow
              file={heroWave.file}
              status={
                <>
                  <span>
                    <span className="text-amber-300">WR0 → RD0</span> · Δ 70 ns · 3 transfers · 2
                    wait states
                  </span>
                  <span className="text-emerald-400">● 0 protocol violations</span>
                </>
              }
            >
              <div className="overflow-x-auto">
                <Waveform wave={heroWave} cycleWidth={60} sweep className="w-full min-w-[860px]" />
              </div>
            </ViewerWindow>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Low-opacity wafer map: a grid of dies inside a circular wafer outline */
function WaferMap({ className }: { className?: string }) {
  const R = 300;
  const C = 320;
  const size = 40;
  const dies: { x: number; y: number; tested: boolean }[] = [];

  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
      const x = col * size;
      const y = row * size;
      const corners = [
        [x, y],
        [x + size, y],
        [x, y + size],
        [x + size, y + size],
      ];
      const inside = corners.every(([px, py]) => Math.hypot(px - C, py - C) < R - 4);
      if (inside) dies.push({ x, y, tested: (row * 7 + col * 3) % 11 === 0 });
    }
  }

  return (
    <svg viewBox="0 0 640 640" aria-hidden="true" className={className}>
      <circle cx={C} cy={C} r={R} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <path d={`M ${C - 30} ${C + R - 2} L ${C + 30} ${C + R - 2}`} stroke="currentColor" strokeWidth={3} />
      {dies.map((die) => (
        <rect
          key={`${die.x}-${die.y}`}
          x={die.x + 3}
          y={die.y + 3}
          width={size - 6}
          height={size - 6}
          fill={die.tested ? "currentColor" : "none"}
          fillOpacity={die.tested ? 0.5 : undefined}
          stroke="currentColor"
          strokeWidth={1}
        />
      ))}
    </svg>
  );
}
