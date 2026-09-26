import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-ink-900/40 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
        <p className="text-slate-500">
          <span className="text-emerald-400">$</span> status:{" "}
          <span className="text-emerald-300">testbench_passed</span>{" "}
          <span className="text-slate-500">(0 errors, 0 warnings)</span>
        </p>
        <p className="text-slate-500">
          © {new Date().getFullYear()} {profile.name} <span className="text-slate-700">·</span>{" "}
          <span className="text-amber-300/80">$finish</span> called at 600 ns
        </p>
      </div>
    </footer>
  );
}
