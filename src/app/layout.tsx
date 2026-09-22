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
  title: "dontotl | Developer Portfolio",
  description: "Automated GitHub-synced portfolio showcasing AI, Full-Stack, and Open Source projects by dontotl.",
  keywords: ["dontotl", "portfolio", "developer", "nextjs", "github-pages", "full-stack", "ai"],
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
