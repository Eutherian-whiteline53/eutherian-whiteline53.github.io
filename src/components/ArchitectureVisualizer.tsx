"use client";

import { ArrowDown, Cpu, Sparkles } from "lucide-react";
import type { ArchitectureStep } from "@/data/projectDetails";

interface ArchitectureVisualizerProps {
  steps: ArchitectureStep[];
}

export default function ArchitectureVisualizer({ steps }: ArchitectureVisualizerProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="w-full space-y-3 bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-slate-800/80">
      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/60">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>Archify · 시스템 아키텍처 구조도</span>
        </div>
        <span className="text-[11px] text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-400" /> End-to-End Flow
        </span>
      </div>

      <div className="relative flex flex-col items-center">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <div key={step.layer} className="w-full flex flex-col items-center">
              {/* Layer Card */}
              <div className="w-full p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-md hover:border-indigo-500/50 transition-all">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-bold text-slate-200 tracking-wide">
                    {step.layer}
                  </span>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                      step.badgeColor || "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
                    }`}
                  >
                    {step.badge}
                  </span>
                </div>

                {/* Sub Components Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {step.components.map((comp) => (
                    <div
                      key={comp.title}
                      className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-xs font-semibold text-slate-100">{comp.title}</h4>
                          {comp.tech && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/40 shrink-0">
                              {comp.tech}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{comp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connecting Down Arrow between Layers */}
              {!isLast && (
                <div className="my-1.5 flex flex-col items-center justify-center text-indigo-400/80">
                  <div className="w-0.5 h-3 bg-gradient-to-b from-slate-700 to-indigo-500" />
                  <ArrowDown className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
