import { ArrowUpRight, CheckCircle2, ChevronDown } from "lucide-react";
import { projects, type Project, type TreeNode } from "@/lib/data";
import { GithubIcon } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ViewerWindow from "./ViewerWindow";
import Waveform from "./Waveform";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            index="3"
            kicker="projects"
            title="Featured verification work"
            description="Testbench architecture, stimulus strategy, and the waveforms that prove the protocol behaves."
          />
        </Reveal>

        <div className="mt-12 space-y-12">
          {projects.map((project) => (
            <Reveal key={project.id}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-800 bg-ink-900/60 transition hover:border-emerald-500/40 hover:shadow-[0_0_50px_-20px_rgba(52,211,153,0.5)]">
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-emerald-400">
              {project.index} <span className="text-slate-600">/</span> {project.subtitle}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-100 sm:text-3xl">{project.title}</h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            {project.coverage}
          </span>
        </div>

        <p className="mt-4 max-w-3xl leading-relaxed text-slate-400">{project.description}</p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <h4 className="font-mono text-xs tracking-widest text-slate-500 uppercase">
              Key highlights
            </h4>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-slate-800 bg-ink-950/70 p-4">
            <h4 className="font-mono text-xs tracking-widest text-slate-500 uppercase">
              Testbench hierarchy
            </h4>
            <ul className="mt-3 font-mono text-xs">
              <Tree node={project.hierarchy} depth={0} />
            </ul>
          </div>
        </div>

        <ViewerWindow
          file={project.wave.file}
          className="mt-8"
          status={
            <>
              <span>{project.waveCaption}</span>
              <span className="text-emerald-400">● assertions passed</span>
            </>
          }
        >
          <div className="overflow-x-auto">
            <Waveform wave={project.wave} cycleWidth={84} className="w-full min-w-[820px]" />
          </div>
        </ViewerWindow>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 px-6 py-5 sm:px-8">
        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-slate-700/80 px-3 py-1 font-mono text-xs text-slate-400"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="flex gap-3">
          <a
            href={project.architectureUrl}
            className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
          >
            View Architecture
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

function Tree({ node, depth }: { node: TreeNode; depth: number }) {
  const nameColor = node.dut
    ? "text-cyan-300"
    : node.children
      ? "text-slate-200"
      : "text-emerald-300";

  return (
    <li>
      <div className="flex items-center gap-1.5 py-0.5" style={{ paddingLeft: depth * 14 }}>
        {node.children ? (
          <ChevronDown className="h-3 w-3 shrink-0 text-slate-500" aria-hidden="true" />
        ) : (
          <span aria-hidden="true" className="flex h-3 w-3 shrink-0 items-center justify-center">
            <span className={`h-1 w-1 rounded-full ${node.dut ? "bg-cyan-400" : "bg-slate-600"}`} />
          </span>
        )}
        <span className={`truncate ${nameColor}`}>
          {node.name}
          {node.type ? <span className="text-slate-500"> : {node.type}</span> : null}
        </span>
      </div>
      {node.children ? (
        <ul>
          {node.children.map((child) => (
            <Tree key={child.name} node={child} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
