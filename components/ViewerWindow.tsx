import type { ReactNode } from "react";
import { Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import { ClockGlyph } from "./icons";

type ViewerWindowProps = {
  file: string;
  children: ReactNode;
  status?: ReactNode;
  className?: string;
};

/** Window chrome styled after a waveform viewer (GTKWave / Verdi). */
export default function ViewerWindow({
  file,
  children,
  status,
  className = "",
}: ViewerWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-800 bg-ink-900/90 shadow-2xl shadow-black/40 ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 bg-ink-800/80 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5 font-mono text-xs">
          <ClockGlyph className="h-4 w-4 shrink-0 text-emerald-400" />
          <span className="truncate text-slate-300">{file}</span>
        </div>
        <div aria-hidden="true" className="flex items-center gap-1 text-slate-500">
          {[ZoomIn, ZoomOut, Maximize2].map((Icon, i) => (
            <span
              key={i}
              className="rounded p-1 transition hover:bg-slate-800 hover:text-slate-300"
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
          ))}
        </div>
      </div>

      {children}

      {status ? (
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-slate-800 bg-ink-800/60 px-4 py-2 font-mono text-[11px] text-slate-500">
          {status}
        </div>
      ) : null}
    </div>
  );
}
