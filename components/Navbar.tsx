"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ClockGlyph, GithubIcon, LinkedinIcon } from "./icons";
import { navLinks, profile } from "@/lib/data";

const iconLink =
  "rounded-md p-2 text-slate-400 transition hover:bg-slate-800/60 hover:text-emerald-300";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-slate-800/80 bg-ink-950/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        aria-label="Primary"
      >
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 transition group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_-4px_rgba(52,211,153,0.6)]">
            <ClockGlyph className="h-5 w-5" />
          </span>
          <span className="font-mono text-sm font-semibold text-slate-100">
            {profile.monogram}
            <span className="text-slate-600">::</span>
            <span className="text-emerald-400">verif</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative block px-3 py-2 font-mono text-[13px] lowercase transition ${
                    isActive ? "text-slate-100" : "text-slate-400 hover:text-emerald-300"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 bottom-0.5 h-px origin-left bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-1 md:flex">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className={iconLink}>
            <GithubIcon className="h-5 w-5" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className={iconLink}>
            <LinkedinIcon className="h-5 w-5" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="rounded-md p-2 text-slate-300 transition hover:bg-slate-800/60 md:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-800/80 bg-ink-950/95 backdrop-blur-md md:hidden">
          <ul className="space-y-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 font-mono text-sm lowercase text-slate-300 transition hover:bg-slate-800/60 hover:text-emerald-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2 pt-3">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className={iconLink}>
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className={iconLink}>
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
