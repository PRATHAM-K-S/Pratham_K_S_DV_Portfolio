import { Activity, Gauge, Network } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const focusAreas = [
  "Functional verification",
  "Testbench architecture",
  "Constrained-random verification",
  "Protocol compliance",
];

const readouts = [
  {
    tag: "Δt experience",
    value: "7+ months",
    label: "Industrial DV experience, from intern to full-time engineer",
    icon: Activity,
  },
  {
    tag: "cov_total",
    value: "100%",
    label: "Coverage-driven: functional and code coverage closure",
    icon: Gauge,
  },
  {
    tag: "protocols",
    value: "APB · AXI4-Lite",
    label: "Verilog AMBA designs verified with SystemVerilog and UVM testbenches",
    icon: Network,
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading index="1" kicker="about" title="Bug hunter by profession" />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <Reveal delay={100} className="lg:col-span-7">
            <div className="space-y-5 text-lg leading-relaxed text-slate-400">
              <p>
                I&apos;m a 2026 Electronics and Communication Engineering graduate from NMAMIT,
                Nitte, early in my career and drawn to the place where digital logic meets
                detective work. During my internship I built SystemVerilog and UVM testbenches, wrote
                constrained-random stimulus, and chased the corner-case bugs that hide between
                the spec and the RTL.
              </p>
              <p>
                I enjoy writing SystemVerilog Assertions that catch protocol violations as they
                happen, closing functional coverage, and automating regressions with Python and
                Makefiles. Right now I&apos;m exploring new tech and building on those
                foundations, one clock edge at a time.
              </p>
            </div>

            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <li key={area} className="flex items-center gap-3 font-mono text-sm text-slate-300">
                  <span aria-hidden="true" className="h-2 w-2 bg-emerald-400" />
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="grid gap-4 lg:col-span-5">
            {readouts.map((r, i) => (
              <Reveal key={r.tag} delay={150 + i * 80}>
                <div className="group rounded-lg border border-slate-800 bg-ink-900/70 p-5 transition hover:border-emerald-500/50 hover:shadow-[0_0_30px_-12px_rgba(52,211,153,0.5)]">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-amber-300">{r.tag}</span>
                    <r.icon
                      className="h-4 w-4 text-slate-600 transition group-hover:text-emerald-400"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 font-mono text-2xl font-semibold text-slate-100">{r.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{r.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
