import { ChevronRight } from "lucide-react";
import { experience } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            index="4"
            kicker="experience"
            title="Experience & education"
            description="From an ECE degree to a verification internship to full-time DV engineer, at the start of the journey."
          />
        </Reveal>

        <ol className="mt-12 max-w-3xl">
          {experience.map((job, i) => (
            <li key={job.role} className="relative pb-10 pl-16 last:pb-0">
              {i < experience.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-11 bottom-1 left-[19px] w-px bg-gradient-to-b from-amber-400/60 via-slate-700 to-slate-800"
                />
              )}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-md border border-amber-400/50 bg-amber-400/10 font-mono text-xs font-bold text-amber-300"
              >
                {job.marker}
              </span>

              <Reveal delay={i * 120}>
                <div
                  className={`rounded-lg border bg-ink-900/60 p-6 transition hover:border-emerald-500/50 ${
                    job.current ? "border-emerald-500/30" : "border-slate-800"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <job.icon className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-slate-100">{job.role}</h3>
                    <span className="rounded-full border border-slate-700 px-2.5 py-0.5 font-mono text-xs text-slate-400">
                      {job.type}
                    </span>
                    {job.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs text-emerald-300">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 motion-reduce:animate-none" />
                        current
                      </span>
                    )}
                  </div>
                  {job.org ? <p className="mt-2 text-sm text-slate-300">{job.org}</p> : null}
                  <p className="mt-2 font-mono text-sm text-amber-300/90">{job.period}</p>
                  {job.points.length > 0 ? (
                    <ul className="mt-4 space-y-2.5">
                      {job.points.map((point) => (
                        <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-slate-400">
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500/70" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
