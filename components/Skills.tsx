import { skillCategories } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            index="2"
            kicker="skills"
            title="The verification toolkit"
            description="Frameworks, languages, protocols, and EDA tools I have worked with so far."
          />
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-ink-900/60">
            <div className="hidden grid-cols-[280px_1fr] border-b border-slate-800 bg-ink-800/60 px-5 py-2.5 font-mono text-[11px] tracking-widest text-slate-500 uppercase md:grid">
              <span>Signal</span>
              <span>Value</span>
            </div>

            <ul className="divide-y divide-slate-800">
              {skillCategories.map((category) => (
                <li
                  key={category.bus}
                  className="group grid grid-cols-1 gap-4 px-5 py-6 transition-colors hover:bg-white/[0.015] md:grid-cols-[280px_minmax(0,1fr)] md:items-center"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-800/50 text-emerald-400 transition group-hover:border-emerald-500/50">
                      <category.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-sm text-emerald-300">
                        {category.bus}[{category.skills.length - 1}:0]
                      </p>
                      <h3 className="text-sm font-medium text-slate-200">{category.title}</h3>
                      <p className="mt-0.5 text-xs text-slate-500">{category.blurb}</p>
                    </div>
                  </div>

                  <ul className="flex flex-wrap gap-y-2 pl-1.5" aria-label={`${category.title} skills`}>
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="group/chip bus-chip -ml-1.5 bg-emerald-500/35 p-px transition hover:bg-emerald-400"
                      >
                        <span className="bus-chip block bg-ink-900 px-4 py-1.5 font-mono text-xs text-emerald-100 transition group-hover/chip:bg-emerald-950">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
