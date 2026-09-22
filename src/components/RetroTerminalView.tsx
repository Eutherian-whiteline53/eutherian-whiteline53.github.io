"use client";

import { useMemo } from "react";
import { Terminal, Cpu, ArrowUpRight, Star, ExternalLink, Sparkles } from "lucide-react";
import type { Project } from "./PortfolioView";
import { CURATED_PROJECT_DETAILS } from "@/data/projectDetails";

interface RetroTerminalViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  searchQuery?: string;
}

function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "방금 전";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}일 전`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}달 전`;
  return `${Math.floor(diffInSeconds / 31536000)}년 전`;
}

export default function RetroTerminalView({
  projects,
  onSelectProject,
  searchQuery = "",
}: RetroTerminalViewProps) {
  return (
    <div className="w-full font-mono rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-950/95 shadow-[0_0_40px_rgba(16,185,129,0.12)] transition-all animate-in fade-in duration-300">
      {/* Terminal Window Titlebar */}
      <div className="bg-slate-900/90 border-b border-emerald-950/80 px-4 py-2.5 flex items-center justify-between gap-3 select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
          <span className="w-3 h-3 rounded-full bg-amber-500/90 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          <span className="ml-2 text-xs text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-200">dontotl@matrix-station</span>
            <span className="text-slate-500">:</span>
            <span className="text-indigo-400">~/projects</span>
            <span className="text-slate-500">(zsh)</span>
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-emerald-400/80">
          <span className="hidden sm:inline text-slate-500">TERM=xterm-256color</span>
          <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-700/40 text-emerald-300 text-[10px]">
            {projects.length} REPOS LOADED
          </span>
        </div>
      </div>

      {/* Terminal Interactive Header / Command */}
      <div className="p-4 sm:p-5 border-b border-emerald-900/40 bg-slate-950/70 space-y-2 text-xs text-slate-300">
        <div className="flex items-center gap-2 text-emerald-400 flex-wrap">
          <span className="text-indigo-400 font-bold">dontotl@github</span>
          <span className="text-slate-500">:</span>
          <span className="text-blue-400 font-bold">~/portfolio</span>
          <span className="text-emerald-400">$</span>
          <span className="text-slate-100 font-semibold">
            list-matrix --all --interactive {searchQuery ? `--filter="${searchQuery}"` : ""}
          </span>
          <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-0.5 align-middle" />
        </div>
        <div className="text-[11px] text-slate-400 space-y-1 pt-1">
          <p className="text-emerald-400/90 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>[SYS-MATRIX] 21개 프로젝트 아키텍처 인덱싱 완료 · 행(Row)을 클릭하면 <strong>Archify 시스템 구조도</strong>가 열립니다.</span>
          </p>
        </div>
      </div>

      {/* Retro Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-emerald-800/60 bg-emerald-950/20 text-emerald-300 text-[11px] uppercase tracking-wider select-none">
              <th className="py-2.5 px-3.5 w-12 text-center text-emerald-500 font-mono">#</th>
              <th className="py-2.5 px-4 min-w-[200px]">REPOSITORY</th>
              <th className="py-2.5 px-4 min-w-[240px]">ROLE / SPECIALTY</th>
              <th className="py-2.5 px-4 min-w-[320px]">CORE TECH STACK CATEGORY</th>
              <th className="py-2.5 px-3 min-w-[100px] text-right">PUSHED</th>
              <th className="py-2.5 px-4 w-20 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500">
                  [WARN] 일치하는 레포지토리가 없습니다. 검색어를 재입력하거나 초기화하세요.
                </td>
              </tr>
            ) : (
              projects.map((project, idx) => {
                const curated = CURATED_PROJECT_DETAILS[project.name];
                const role = curated?.role || "Software Architecture & Dev";
                const techCategories = curated?.techStack
                  ? curated.techStack.map((s) => s.category).join(", ")
                  : project.topics.slice(0, 3).join(", ") || project.language;
                const topItems = curated?.techStack
                  ? curated.techStack.flatMap((s) => s.items).slice(0, 3)
                  : project.topics.slice(0, 3);

                return (
                  <tr
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className="group hover:bg-emerald-950/30 hover:border-emerald-500/40 transition-all cursor-pointer border-b border-slate-900/80"
                  >
                    {/* Index */}
                    <td className="py-3 px-3.5 text-center text-slate-500 group-hover:text-emerald-400 font-mono text-[11px]">
                      {String(idx + 1).padStart(2, "0")}
                    </td>

                    {/* Repository Name & Lang */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-cyan-300 group-hover:text-cyan-100 group-hover:underline underline-offset-2 transition-colors">
                          {project.name}
                        </span>
                        {project.featured && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            ★feat
                          </span>
                        )}
                        {project.stars > 0 && (
                          <span className="text-[10px] text-amber-400 flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-amber-400" />
                            {project.stars}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500 group-hover:text-slate-400">
                          [{project.language}]
                        </span>
                      </div>
                    </td>

                    {/* Role / Specialty */}
                    <td className="py-3 px-4">
                      <span className="text-amber-300/95 group-hover:text-amber-200 font-medium text-xs leading-relaxed block">
                        {role}
                      </span>
                    </td>

                    {/* Core Tech Stack Categories */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <span className="text-emerald-400/90 text-xs block font-medium group-hover:text-emerald-300">
                          {techCategories}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {topItems.map((item) => (
                            <span
                              key={item}
                              className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800 group-hover:border-slate-700 group-hover:text-slate-300"
                            >
                              [{item}]
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>

                    {/* Pushed At */}
                    <td className="py-3 px-3 text-right text-[11px] text-slate-500 group-hover:text-slate-400 whitespace-nowrap">
                      {timeAgo(project.pushedAt)}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950/70 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-700/50 transition-colors text-[11px] font-semibold cursor-pointer shadow-sm"
                      >
                        <span>[VIEW]</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Terminal Footer Bar */}
      <div className="p-3 bg-slate-900/90 border-t border-emerald-950/80 px-4 flex items-center justify-between gap-3 text-[11px] text-slate-400 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-400 font-semibold">[ONLINE]</span>
          <span>총 <strong>{projects.length}</strong>개 아키텍처 행 렌더링 완료</span>
        </div>
        <div className="text-slate-500 text-[10px] flex items-center gap-2">
          <span>HINT: 각 행을 클릭하면 Archify 상세 다이어그램 팝업</span>
          <span className="text-emerald-400 font-bold">█</span>
        </div>
      </div>
    </div>
  );
}
