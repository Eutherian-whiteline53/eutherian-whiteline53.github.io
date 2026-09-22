import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dontotl.github.io"),
  title: {
    default: "dontotl.systems | Building Autonomous AI & Cloud-Native Systems",
    template: "%s | dontotl.systems",
  },
  description:
    "데이터베이스 코어부터 클라우드 인프라, 자율형 AI 에이전트까지 — 시스템의 시작과 끝을 설계하고 코드로 증명합니다. OCI 도서 저술, Oracle DB 23ai, Pgvector ANN, LLM 벤치마크 아키텍처 포트폴리오.",
  keywords: [
    "dontotl",
    "dontotl.systems",
    "Cloud-Native Architecture",
    "Oracle Cloud Infrastructure",
    "OCI",
    "바로 쓰는 오라클 클라우드",
    "Oracle DB 23ai",
    "JSON Duality View",
    "Pgvector",
    "ANN Benchmark",
    "LLM Benchmark CLI",
    "Autonomous AI Agents",
    "Database Engineering",
    "Systems Architecture",
    "Next.js",
    "GitHub Pages",
    "포트폴리오",
    "오라클 클라우드 아키텍처",
    "인공지능 에이전트",
    "벡터 데이터베이스",
  ],
  authors: [{ name: "dontotl", url: "https://github.com/dontotl" }],
  creator: "dontotl",
  publisher: "dontotl.systems",
  alternates: {
    canonical: "https://dontotl.github.io",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://dontotl.github.io",
    siteName: "dontotl.systems",
    title: "dontotl.systems | Building Autonomous AI & Cloud-Native Systems",
    description:
      "데이터베이스 코어부터 클라우드 인프라, 자율형 AI 에이전트까지 — 시스템의 시작과 끝을 설계하고 코드로 증명합니다. OCI 도서 저술, Oracle DB 23ai, Pgvector ANN, LLM 벤치마크 아키텍처 포트폴리오.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "dontotl.systems - Building Autonomous AI & Cloud-Native Systems",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "dontotl.systems | Building Autonomous AI & Cloud-Native Systems",
    description:
      "데이터베이스 코어부터 클라우드 인프라, 자율형 AI 에이전트까지 — 시스템의 시작과 끝을 설계하고 코드로 증명합니다.",
    images: ["/og-image.png"],
    creator: "@dontotl",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark h-full">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white flex flex-col font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
