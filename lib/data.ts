import {
  Briefcase,
  Code2,
  Cpu,
  GraduationCap,
  Network,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { bit, bus, clock, type Wave } from "./waveform";

/* ────────────────────────────────────────────────────────────────
   PLACEHOLDER LINKS — replace these with your real profiles.
   Everything on the site reads from this single file.
   ──────────────────────────────────────────────────────────────── */
export const profile = {
  name: "Pratham K S",
  monogram: "PKS",
  role: "Design & Verification Engineer",
  email: "prathamks2302@gmail.com",
  github: "https://github.com/PRATHAM-K-S",
  linkedin: "https://www.linkedin.com/in/pratham-k-s-69118524b/",
  resumeUrl: "/resume.pdf", // TODO: drop your resume PDF into /public
  location: "Udupi, India",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* ── Hero waveform: APB back-to-back writes + read with wait states ── */
export const heroWave: Wave = {
  file: "sim/apb_burst_test.vcd",
  cycles: 16,
  signals: [
    clock("PCLK"),
    bit("PRESETn", "0011111111111111"),
    bit("PSEL", "0001111100111000"),
    bit("PENABLE", "0000110100011000"),
    bit("PWRITE", "0001111100000000"),
    bit("PREADY", "0000010100001000"),
    bus("PADDR[31:0]", ["", 3], ["0x40", 3], ["0x44", 2], ["", 2], ["0x48", 3], ["", 3]),
    bus("PWDATA[31:0]", ["", 3], ["CAFE", 3], ["BEEF", 2], ["", 8]),
    bus("PRDATA[31:0]", ["", 12], ["1234", 1], ["", 3]),
  ],
  markers: [
    { at: 6, label: "WR0" },
    { at: 8, label: "WR1" },
    { at: 13, label: "RD0" },
  ],
};

/* ── Skills ─────────────────────────────────────────────────────── */
export type SkillCategory = {
  bus: string;
  title: string;
  icon: LucideIcon;
  blurb: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    bus: "hdl_verif",
    title: "HDLs & Verification Frameworks",
    icon: Cpu,
    blurb: "Coverage-driven, constrained-random testbench architecture.",
    skills: ["SystemVerilog", "UVM", "Cocotb", "Verilog", "SVA", "Functional Coverage"],
  },
  {
    bus: "lang_script",
    title: "Languages & Scripting",
    icon: Code2,
    blurb: "Automation for regressions, log parsing, and reporting.",
    skills: ["C", "Python", "Bash / Shell"],
  },
  {
    bus: "proto_domain",
    title: "Protocols & Domains",
    icon: Network,
    blurb: "AMBA-based IP and subsystem-level verification.",
    skills: ["AMBA APB", "AXI4-Lite", "FIFOs", "Memory Controllers"],
  },
  {
    bus: "tools_env",
    title: "Tools & Platforms",
    icon: Wrench,
    blurb: "Industry-standard EDA tools on Linux-based flows.",
    skills: [
      "Synopsys VCS",
      "QuestaSim / ModelSim",
      "Vivado",
      "GTKWave",
      "Linux / Unix",
      "Git",
      "Makefiles",
    ],
  },
];

/* ── Projects ───────────────────────────────────────────────────── */
export type TreeNode = {
  name: string;
  type?: string;
  dut?: boolean;
  children?: TreeNode[];
};

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tech: string[];
  coverage: string;
  hierarchy: TreeNode;
  wave: Wave;
  waveCaption: string;
  architectureUrl: string;
  githubUrl: string;
};

export const projects: Project[] = [
  {
    id: "apb",
    index: "01",
    title: "APB Protocol Verification",
    subtitle: "Class-based SystemVerilog testbench",
    description:
      "A layered verification environment written in pure SystemVerilog (no UVM) for an APB slave design written in Verilog, built from scratch and driven to full coverage closure with targeted and constrained-random stimulus.",
    highlights: [
      "Built a class-based SystemVerilog testbench from scratch: transaction, generator, driver, monitor, scoreboard, and coverage model",
      "Targeted and constrained-random stimulus for single and burst read/write transactions, wait-state assertions, and PSLVERR error responses",
      "Achieved 100% functional and code coverage on the Verilog DUT",
    ],
    tech: ["SystemVerilog", "Verilog DUT", "AMBA APB", "SVA", "Functional Coverage"],
    coverage: "100% functional & code coverage",
    hierarchy: {
      name: "tb_top",
      children: [
        { name: "vif", type: "apb_if" },
        {
          name: "test",
          type: "apb_test",
          children: [
            {
              name: "env",
              type: "apb_env",
              children: [
                { name: "generator", type: "apb_generator" },
                { name: "driver", type: "apb_driver" },
                { name: "monitor", type: "apb_monitor" },
                { name: "scoreboard", type: "apb_scoreboard" },
                { name: "coverage", type: "apb_coverage" },
              ],
            },
          ],
        },
        { name: "dut", type: "apb_slave.v", dut: true },
      ],
    },
    wave: {
      file: "sim/apb_wait_err_test.vcd",
      cycles: 10,
      signals: [
        clock("PCLK"),
        bit("PSEL", "0111011000"),
        bit("PENABLE", "0011001000"),
        bit("PWRITE", "0111000000"),
        bit("PREADY", "0001001000"),
        bus("PADDR[31:0]", ["", 1], ["0xA0", 3], ["", 1], ["0xA4", 2], ["", 3]),
        bit("PSLVERR", "0000001000", "error"),
      ],
      markers: [
        { at: 2.5, label: "WAIT" },
        { at: 6.5, label: "PSLVERR" },
      ],
    },
    waveCaption: "Write with one wait state, then a read that returns PSLVERR",
    architectureUrl: "#", // TODO: link to architecture doc/diagram
    githubUrl: "https://github.com/PRATHAM-K-S", // TODO: link the project repo
  },
  {
    id: "axi",
    index: "02",
    title: "AXI4-Lite Protocol Verification",
    subtitle: "UVM environment for AMBA AXI4-Lite",
    description:
      "A UVM verification environment for an AXI4-Lite slave design written in Verilog, backed by SVA protocol checkers and automated regressions.",
    highlights: [
      "Verified read/write channel independence, VALID/READY handshakes, address-decoder boundary checks, and back-to-back transfers",
      "Authored SVA checkers for protocol handshake timing rules",
      "Generated automated regression test reports and coverage analysis",
    ],
    tech: ["SystemVerilog", "UVM", "Verilog DUT", "AXI4-Lite", "SVA"],
    coverage: "Automated regression & coverage reports",
    hierarchy: {
      name: "tb_top",
      children: [
        {
          name: "axi_env",
          type: "uvm_env",
          children: [
            {
              name: "axi_agent",
              type: "uvm_agent",
              children: [
                { name: "sequencer", type: "uvm_sequencer" },
                { name: "driver", type: "axi_driver" },
                { name: "monitor", type: "axi_monitor" },
              ],
            },
            { name: "scoreboard", type: "axi_scoreboard" },
            { name: "coverage", type: "axi_cov" },
          ],
        },
        { name: "sva_bind", type: "axi_protocol_sva" },
        { name: "dut", type: "axi4_lite_slave.v", dut: true },
      ],
    },
    wave: {
      file: "sim/axi_lite_write_test.vcd",
      cycles: 10,
      signals: [
        clock("ACLK"),
        bit("AWVALID", "0001100000"),
        bit("AWREADY", "0000100000"),
        bus("AWADDR[31:0]", ["", 3], ["0x10", 2], ["", 5]),
        bit("WVALID", "0110000000"),
        bit("WREADY", "0010000000"),
        bus("WDATA[31:0]", ["", 1], ["DEAD", 2], ["", 7]),
        bit("BVALID", "0000011000"),
        bit("BREADY", "0000001000"),
      ],
      markers: [
        { at: 2.5, label: "W" },
        { at: 4.5, label: "AW" },
        { at: 6.5, label: "B" },
      ],
    },
    waveCaption: "Write data accepted before the address: independent channels",
    architectureUrl: "#", // TODO: link to architecture doc/diagram
    githubUrl: "https://github.com/PRATHAM-K-S", // TODO: link the project repo
  },
];

/* ── Experience ─────────────────────────────────────────────────── */
export type ExperienceItem = {
  marker: string;
  role: string;
  org?: string;
  type: string;
  period: string;
  current: boolean;
  icon: LucideIcon;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    marker: "M2",
    role: "Design Verification Engineer",
    type: "Full-Time",
    period: "2026 — Present",
    current: true,
    icon: Briefcase,
    points: [
      "Recently started full-time after a six-month DV internship",
      "Getting up to speed on industry verification flows, EDA tools, and team workflows",
      "Exploring new tech and deepening my UVM, SVA, and coverage-driven verification skills",
    ],
  },
  {
    marker: "M1",
    role: "Design Verification Intern",
    type: "Internship",
    period: "6 months",
    current: false,
    icon: Cpu,
    points: [
      "Built a class-based SystemVerilog testbench for APB and a UVM environment for AXI4-Lite, both verifying Verilog designs",
      "Wrote SystemVerilog Assertions for protocol compliance on AMBA APB and AXI4-Lite",
      "Automated regression runs and coverage reporting with Python, Bash, and Makefiles",
    ],
  },
  {
    marker: "M0",
    role: "B.Tech, Electronics and Communication Engineering",
    org: "NMAM Institute of Technology (NMAMIT), Nitte, India",
    type: "Education",
    period: "Graduated 2026",
    current: false,
    icon: GraduationCap,
    points: [],
  },
];
