import type { ReactNode } from "react";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            index="5"
            kicker="contact"
            title="Say hello"
            description="Always happy to talk verification, swap debug stories, or just connect."
          />
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ContactRow
              icon={<Mail className="h-5 w-5" aria-hidden="true" />}
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <ContactRow
              icon={<LinkedinIcon className="h-5 w-5" />}
              label="LinkedIn"
              value={profile.linkedin.replace("https://", "")}
              href={profile.linkedin}
            />
            <ContactRow
              icon={<GithubIcon className="h-5 w-5" />}
              label="GitHub"
              value={profile.github.replace("https://", "")}
              href={profile.github}
            />
            <div className="flex items-center gap-4 rounded-lg border border-slate-800 bg-ink-900/60 px-5 py-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-800/50 text-emerald-400">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-mono text-[11px] text-slate-500">Location</span>
                <span className="block text-sm text-slate-200">{profile.location}</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  const external = !href.startsWith("mailto");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-lg border border-slate-800 bg-ink-900/60 px-5 py-4 transition hover:border-emerald-500/50 hover:shadow-[0_0_24px_-10px_rgba(52,211,153,0.5)]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-800/50 text-emerald-400 transition group-hover:border-emerald-500/50">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[11px] text-slate-500">{label}</span>
        <span className="block truncate text-sm text-slate-200 transition group-hover:text-emerald-300">
          {value}
        </span>
      </span>
    </a>
  );
}
