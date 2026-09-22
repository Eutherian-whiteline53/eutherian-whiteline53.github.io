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
  title: "dontotl.systems | Building Autonomous AI & Cloud-Native Systems",
  description: "데이터베이스 코어부터 클라우드 인프라, 자율형 AI 에이전트까지 — 시스템의 시작과 끝을 설계하고 코드로 증명합니다.",
  keywords: ["dontotl", "dontotl.systems", "cloud-native", "oracle-cloud", "ai-agents", "database", "portfolio", "nextjs", "github-pages"],
  authors: [{ name: "dontotl", url: "https://github.com/dontotl" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white flex flex-col font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
