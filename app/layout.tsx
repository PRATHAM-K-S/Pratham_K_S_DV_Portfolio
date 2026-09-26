import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pratham K S | Design & Verification Engineer",
  description:
    "Portfolio of Pratham K S, a Design & Verification Engineer specializing in SystemVerilog, UVM, Cocotb, and coverage-driven verification of AMBA protocols (APB, AXI4-Lite).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink-950 text-slate-300">
        {children}
      </body>
    </html>
  );
}
