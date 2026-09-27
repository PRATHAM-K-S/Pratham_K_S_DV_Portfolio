import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://pratham-k-s-dv-portfolio.vercel.app";
const title = "Pratham K S | Design & Verification Engineer";
const description =
  "Portfolio of Pratham K S, a Design & Verification Engineer working with SystemVerilog, UVM, and SVA on coverage-driven verification of AMBA APB and AXI4-Lite.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: "Pratham K S", url: siteUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Pratham K S · DV Portfolio",
    title,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink-950 text-slate-300">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
