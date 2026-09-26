import type { CSSProperties } from "react";
import type { Bit, Wave } from "@/lib/waveform";

const NAME_W = 124;
const RULER_H = 30;
const NS_PER_CYCLE = 10;

const COLOR = {
  clock: "#22d3ee",
  bit: "#34d399",
  error: "#fb7185",
  busText: "#d1fae5",
  idle: "#64748b",
  marker: "#fbbf24",
  sweep: "#e2e8f0",
  grid: "#1e293b",
  tick: "#475569",
  label: "#64748b",
  name: "#94a3b8",
};

type WaveformProps = {
  wave: Wave;
  cycleWidth?: number;
  laneHeight?: number;
  sweep?: boolean;
  className?: string;
};

type Segment = { value: string; start: number; end: number };

function toSegments(values: string[]): Segment[] {
  const segments: Segment[] = [];
  values.forEach((value, i) => {
    const last = segments[segments.length - 1];
    if (last && last.value === value) last.end = i + 1;
    else segments.push({ value, start: i, end: i + 1 });
  });
  return segments;
}

export default function Waveform({
  wave,
  cycleWidth: W = 60,
  laneHeight: H = 28,
  sweep = false,
  className = "",
}: WaveformProps) {
  const { cycles, signals, markers = [] } = wave;
  const waveWidth = cycles * W;
  const width = NAME_W + waveWidth + 12;
  const height = RULER_H + signals.length * H + 4;
  const x = (cycle: number) => NAME_W + cycle * W;
  const ticks = Array.from({ length: cycles + 1 }, (_, c) => c);

  const clockPath = (top: number, bot: number) => {
    let d = `M ${x(0)} ${bot}`;
    for (let c = 0; c < cycles; c++) {
      const x0 = x(c);
      d += ` L ${x0} ${top} L ${x0 + W / 2} ${top} L ${x0 + W / 2} ${bot} L ${x0 + W} ${bot}`;
    }
    return d;
  };

  const bitPath = (values: Bit[], top: number, bot: number) => {
    const y = (v: Bit) => (v ? top : bot);
    let d = `M ${x(0)} ${y(values[0])}`;
    values.forEach((v, c) => {
      if (c > 0 && v !== values[c - 1]) {
        d += ` L ${x(c)} ${y(values[c - 1])} L ${x(c)} ${y(v)}`;
      }
    });
    return `${d} L ${x(values.length)} ${y(values[values.length - 1])}`;
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Waveform ${wave.file} showing ${signals.map((s) => s.name).join(", ")}`}
      className={`font-mono ${className}`}
    >
      {/* Signal-name pane */}
      <rect x={0} y={0} width={NAME_W - 10} height={height} fill="#ffffff" fillOpacity={0.02} />
      <line x1={NAME_W - 10} x2={NAME_W - 10} y1={0} y2={height} stroke={COLOR.grid} />
      <text x={12} y={RULER_H - 9} fontSize={9} letterSpacing={1.5} fill={COLOR.label}>
        SIGNALS
      </text>

      {signals.map((s, i) =>
        i % 2 === 1 ? (
          <rect
            key={`lane-${s.name}`}
            x={NAME_W - 10}
            y={RULER_H + i * H}
            width={width}
            height={H}
            fill="#ffffff"
            fillOpacity={0.015}
          />
        ) : null
      )}

      {/* Time ruler + cycle grid */}
      <line x1={NAME_W - 10} x2={width} y1={RULER_H} y2={RULER_H} stroke={COLOR.tick} />
      {ticks.map((c) => (
        <g key={`tick-${c}`}>
          <line
            x1={x(c)}
            x2={x(c)}
            y1={RULER_H - (c % 4 === 0 ? 8 : 4)}
            y2={RULER_H}
            stroke={COLOR.tick}
          />
          <line
            x1={x(c)}
            x2={x(c)}
            y1={RULER_H}
            y2={height}
            stroke={COLOR.grid}
            strokeDasharray="2 4"
          />
          {c % 4 === 0 && c < cycles ? (
            <text x={x(c) + 4} y={RULER_H - 9} fontSize={9} fill={COLOR.label}>
              {c * NS_PER_CYCLE}ns
            </text>
          ) : null}
        </g>
      ))}

      {/* Traces */}
      {signals.map((s, i) => {
        const top = RULER_H + i * H + 7;
        const bot = RULER_H + (i + 1) * H - 7;
        const mid = (top + bot) / 2;
        const style = { "--d": `${i * 90}ms` } as CSSProperties;

        return (
          <g key={s.name}>
            <text x={12} y={mid + 4} fontSize={11} fill={COLOR.name}>
              {s.name}
            </text>

            {s.kind === "bus" ? (
              toSegments(s.values).map((seg) => {
                const x1 = x(seg.start);
                const x2 = x(seg.end);
                const key = `${s.name}-${seg.start}`;

                if (!seg.value) {
                  return (
                    <path
                      key={key}
                      d={`M ${x1} ${mid} L ${x2} ${mid}`}
                      fill="none"
                      stroke={COLOR.idle}
                      strokeWidth={1.25}
                      pathLength={1}
                      className="wave-draw"
                      style={style}
                    />
                  );
                }

                const k = Math.min(5, (x2 - x1) / 2);
                const d = `M ${x1} ${mid} L ${x1 + k} ${top} L ${x2 - k} ${top} L ${x2} ${mid} L ${x2 - k} ${bot} L ${x1 + k} ${bot} Z`;
                return (
                  <g key={key}>
                    <path d={d} fill={COLOR.bit} fillOpacity={0.1} className="wave-fade" style={style} />
                    <path
                      d={d}
                      fill="none"
                      stroke={COLOR.bit}
                      strokeWidth={1.5}
                      strokeLinejoin="round"
                      pathLength={1}
                      className="wave-draw"
                      style={style}
                    />
                    {x2 - x1 > seg.value.length * 6.6 + 12 ? (
                      <text
                        x={(x1 + x2) / 2}
                        y={mid + 3.5}
                        fontSize={10}
                        textAnchor="middle"
                        fill={COLOR.busText}
                        className="wave-fade"
                        style={style}
                      >
                        {seg.value}
                      </text>
                    ) : null}
                  </g>
                );
              })
            ) : (
              <path
                d={s.kind === "clock" ? clockPath(top, bot) : bitPath(s.values, top, bot)}
                fill="none"
                stroke={
                  s.kind === "clock" ? COLOR.clock : s.tone === "error" ? COLOR.error : COLOR.bit
                }
                strokeWidth={1.5}
                strokeLinejoin="round"
                pathLength={1}
                className="wave-draw"
                style={style}
              />
            )}
          </g>
        );
      })}

      {/* Markers */}
      {markers.map((m) => {
        const mx = x(m.at);
        const w = m.label.length * 6 + 12;
        return (
          <g key={m.label}>
            <line
              x1={mx}
              x2={mx}
              y1={16}
              y2={height}
              stroke={COLOR.marker}
              strokeOpacity={0.7}
              strokeDasharray="3 3"
            />
            <rect x={mx - w / 2} y={2} width={w} height={14} rx={3} fill={COLOR.marker} />
            <text
              x={mx}
              y={12.5}
              fontSize={9}
              fontWeight={700}
              textAnchor="middle"
              fill="#0b0f16"
            >
              {m.label}
            </text>
          </g>
        );
      })}

      {/* Sweeping simulation cursor */}
      {sweep ? (
        <g className="wave-sweep" style={{ "--sweep": `${waveWidth}px` } as CSSProperties}>
          <line
            x1={x(0)}
            x2={x(0)}
            y1={RULER_H}
            y2={height}
            stroke={COLOR.sweep}
            strokeOpacity={0.55}
            strokeWidth={1.25}
          />
          <path
            d={`M ${x(0) - 4} ${RULER_H} L ${x(0) + 4} ${RULER_H} L ${x(0)} ${RULER_H + 6} Z`}
            fill={COLOR.sweep}
          />
        </g>
      ) : null}
    </svg>
  );
}
