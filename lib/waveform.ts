export type Bit = 0 | 1;

export type Signal =
  | { name: string; kind: "clock" }
  | { name: string; kind: "bit"; values: Bit[]; tone?: "error" }
  | { name: string; kind: "bus"; values: string[] };

/** `at` is measured in clock cycles and may be fractional. */
export type Marker = { at: number; label: string };

export type Wave = {
  file: string;
  cycles: number;
  signals: Signal[];
  markers?: Marker[];
};

export const clock = (name: string): Signal => ({ name, kind: "clock" });

/** One character per cycle, e.g. bit("PSEL", "0011100"). */
export const bit = (name: string, pattern: string, tone?: "error"): Signal => ({
  name,
  kind: "bit",
  values: [...pattern].map((c) => (c === "1" ? 1 : 0)),
  tone,
});

/** Run-length encoded bus values; "" means idle / high-Z. */
export const bus = (name: string, ...runs: [string, number][]): Signal => ({
  name,
  kind: "bus",
  values: runs.flatMap(([value, count]) => Array<string>(count).fill(value)),
});
