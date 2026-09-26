type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  index,
  kicker,
  title,
  description,
}: SectionHeadingProps) {
  const n = Number(index);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 font-mono text-xs">
        <span className="rounded bg-amber-400 px-1.5 py-0.5 font-bold text-ink-950">
          T{n}
        </span>
        <span className="text-slate-500">@ {n * 100} ns</span>
        <span className="text-emerald-400">{kicker}</span>
      </div>
      <div
        aria-hidden="true"
        className="ruler-ticks mt-4 h-2.5 w-full max-w-md [mask-image:linear-gradient(to_right,black_40%,transparent)]"
      />
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">{description}</p>
      ) : null}
    </div>
  );
}
