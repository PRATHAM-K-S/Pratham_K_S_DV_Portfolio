import { ImageResponse } from "next/og";

export const alt = "Pratham K S, Design & Verification Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CYCLES = 12;
const CYCLE_W = 75;
const LANE_H = 30;
const WAVE_W = CYCLES * CYCLE_W;

const lanes: { name: string; kind: "clock" | "bit" | "bus"; pattern?: string }[] = [
  { name: "PCLK", kind: "clock" },
  { name: "PSEL", kind: "bit", pattern: "011110011100" },
  { name: "PENABLE", kind: "bit", pattern: "001110001100" },
  { name: "PREADY", kind: "bit", pattern: "000010000100" },
  { name: "PADDR", kind: "bus", pattern: "011110011100" },
];

function lanePath(kind: "clock" | "bit" | "bus", pattern: string, row: number): string {
  const top = row * LANE_H + 6;
  const bot = row * LANE_H + LANE_H - 6;
  const mid = (top + bot) / 2;
  const x = (c: number) => c * CYCLE_W;

  if (kind === "clock") {
    let d = `M 0 ${bot}`;
    for (let c = 0; c < CYCLES; c++) {
      d += ` L ${x(c)} ${top} L ${x(c) + CYCLE_W / 2} ${top} L ${x(c) + CYCLE_W / 2} ${bot} L ${x(c + 1)} ${bot}`;
    }
    return d;
  }

  const bits = [...pattern].map((ch) => ch === "1");

  if (kind === "bit") {
    const y = (v: boolean) => (v ? top : bot);
    let d = `M 0 ${y(bits[0])}`;
    bits.forEach((v, c) => {
      if (c > 0 && v !== bits[c - 1]) d += ` L ${x(c)} ${y(bits[c - 1])} L ${x(c)} ${y(v)}`;
    });
    return `${d} L ${x(CYCLES)} ${y(bits[CYCLES - 1])}`;
  }

  let d = "";
  let start = 0;
  for (let c = 1; c <= CYCLES; c++) {
    if (c === CYCLES || bits[c] !== bits[start]) {
      const x1 = x(start);
      const x2 = x(c);
      d += bits[start]
        ? ` M ${x1} ${mid} L ${x1 + 6} ${top} L ${x2 - 6} ${top} L ${x2} ${mid} L ${x2 - 6} ${bot} L ${x1 + 6} ${bot} Z`
        : ` M ${x1} ${mid} L ${x2} ${mid}`;
      start = c;
    }
  }
  return d;
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          backgroundColor: "#07090e",
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              padding: "6px 14px",
              borderRadius: 8,
              border: "1px solid rgba(52,211,153,0.5)",
              backgroundColor: "rgba(52,211,153,0.1)",
              color: "#6ee7b7",
              fontSize: 22,
            }}
          >
            PKS::verif
          </div>
          <div style={{ display: "flex", color: "#64748b", fontSize: 22 }}>
            pratham-k-s-dv-portfolio.vercel.app
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.05 }}>
            Pratham K S
          </div>
          <div style={{ display: "flex", marginTop: 12, fontSize: 40, color: "#34d399" }}>
            Design & Verification Engineer
          </div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 26, color: "#94a3b8" }}>
            SystemVerilog · UVM · SVA · AMBA APB & AXI4-Lite
          </div>
        </div>

        <div
          style={{
            display: "flex",
            padding: "16px 20px",
            borderRadius: 14,
            border: "1px solid #1e293b",
            backgroundColor: "rgba(11,15,22,0.9)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", width: 130 }}>
            {lanes.map((lane) => (
              <div
                key={lane.name}
                style={{ display: "flex", alignItems: "center", height: LANE_H, fontSize: 17, color: "#94a3b8" }}
              >
                {lane.name}
              </div>
            ))}
          </div>
          <svg width={WAVE_W} height={lanes.length * LANE_H} viewBox={`0 0 ${WAVE_W} ${lanes.length * LANE_H}`}>
            {lanes.map((lane, row) => (
              <path
                key={lane.name}
                d={lanePath(lane.kind, lane.pattern ?? "", row)}
                fill={lane.kind === "bus" ? "rgba(52,211,153,0.12)" : "none"}
                stroke={lane.kind === "clock" ? "#22d3ee" : "#34d399"}
                strokeWidth={2.5}
                strokeLinejoin="round"
              />
            ))}
            {[5, 10].map((c) => (
              <path
                key={c}
                d={`M ${c * CYCLE_W} 0 L ${c * CYCLE_W} ${lanes.length * LANE_H}`}
                stroke="#fbbf24"
                strokeWidth={2}
                strokeDasharray="6 6"
              />
            ))}
          </svg>
        </div>
      </div>
    ),
    size
  );
}
