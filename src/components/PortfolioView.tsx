"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Star,
  GitFork,
  ExternalLink,
  Sparkles,
  Calendar,
  Layers,
  Code2,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import ProjectModal from "./ProjectModal";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export interface Project {
  id: number;
  name: string;
  fullName: string;
  description: string;
  htmlUrl: string;
  homepage: string | null;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
  isFork: boolean;
  isPrivate: boolean;
  isArchived: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
}

export interface PortfolioData {
  updatedAt: string;
  username: string;
  totalCount: number;
  projects: Project[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500 text-white",
  JavaScript: "bg-amber-400 text-slate-900",
  Python: "bg-sky-500 text-white",
  HTML: "bg-orange-500 text-white",
  CSS: "bg-purple-500 text-white",
  Java: "bg-amber-600 text-white",
  Go: "bg-cyan-500 text-white",
  Rust: "bg-orange-700 text-white",
  Other: "bg-slate-600 text-slate-200",
};

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

export default function PortfolioView({ data }: { data: PortfolioData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "stars" | "name">("recent");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 언어 목록 추출
  const languages = useMemo(() => {
    const langs = new Set<string>();
    data.projects.forEach((p) => {
      if (p.language) langs.add(p.language);
    });
    return ["All", ...Array.from(langs).sort()];
  }, [data.projects]);

  // 필터링 및 정렬
  const filteredProjects = useMemo(() => {
    return data.projects
      .filter((project) => {
        const matchesSearch =
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        if (!matchesSearch) return false;

        if (selectedLanguage !== "All" && project.language !== selectedLanguage) {
          return false;
        }

        if (showFeaturedOnly && !project.featured) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "recent") {
          return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
        }
        if (sortBy === "stars") {
          return b.stars - a.stars;
        }
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [data.projects, searchQuery, selectedLanguage, showFeaturedOnly, sortBy]);

  const featuredProjects = useMemo(() => {
    return data.projects.filter((p) => p.featured);
  }, [data.projects]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col">
      {/* Background Accent Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-600 rounded-full blur-[128px]" />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20">
              D
            </div>
            <a href={`https://github.com/${data.username}`} target="_blank" rel="noreferrer" className="font-semibold text-lg hover:text-indigo-400 transition-colors">
              {data.username}
            </a>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>GitHub Auto-Sync Active</span>
            </div>
            <a
              href={`https://github.com/${data.username}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-colors text-slate-200"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub Profile</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-800/50 text-indigo-300 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Automated Repository Portfolio</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 mb-6">
          Building AI & Full-Stack Systems
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          GitHub 레포지토리와 실시간으로 동기화되어 배포되는 자동화 포트폴리오입니다.
          카드를 클릭하면 각 프로젝트의 <strong>아키텍처, 기술 스택, 핵심 설계 포인트</strong>를 자세히 확인할 수 있습니다.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>총 <strong>{data.totalCount}</strong>개 프로젝트</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span><strong>{languages.length - 1}</strong>개 기술 스택</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>마지막 동기화: {new Date(data.updatedAt).toLocaleDateString("ko-KR")}</span>
          </div>
        </div>
      </section>

      {/* Featured Projects Highlight (if any) */}
      {featuredProjects.length > 0 && !searchQuery && selectedLanguage === "All" && (
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-12">
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-slate-100">Featured Projects</h2>
            </div>
            <span className="text-xs text-slate-400">카드를 클릭하여 상세 아키텍처 보기</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-900/80 border border-indigo-500/30 hover:border-indigo-500/70 transition-all duration-300 shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      ★ Featured
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" /> {timeAgo(project.pushedAt)}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.language && (
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${LANGUAGE_COLORS[project.language] || LANGUAGE_COLORS.Other}`}>
                        {project.language}
                      </span>
                    )}
                    {project.topics.slice(0, 4).map((topic) => (
                      <span key={topic} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/50">
                        #{topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400" /> {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-slate-400" /> {project.forks}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-700/50 transition-colors font-medium cursor-pointer"
                      >
                        상세 보기 <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shadow-md shadow-indigo-600/20"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                        </a>
                      )}
                      <a
                        href={project.htmlUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" /> Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Filter & Grid Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 flex-1 w-full pb-20">
        {/* Controls Bar */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl mb-8 space-y-4 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="프로젝트, 기술, 키워드 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Sort & Quick Toggles */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`text-xs px-3 py-2 rounded-xl border transition-all font-medium flex items-center gap-1.5 ${
                  showFeaturedOnly
                    ? "bg-indigo-600 border-indigo-500 text-white"
                    : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Featured만 보기
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "recent" | "stars" | "name")}
                className="text-xs px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="recent">최근 업데이트순</option>
                <option value="stars">Star 많은순</option>
                <option value="name">이름 가나다순</option>
              </select>
            </div>
          </div>

          {/* Language Filter Chips */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setSelectedLanguage(lang)}
                className={`text-xs px-3 py-1 rounded-lg transition-all ${
                  selectedLanguage === lang
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 font-semibold"
                    : "bg-slate-950/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800/50"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-1">
          <span>
            총 <strong>{filteredProjects.length}</strong>개의 프로젝트 (카드를 클릭하여 상세 정보 보기)
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedLanguage("All");
                setShowFeaturedOnly(false);
              }}
              className="text-indigo-400 hover:underline"
            >
              필터 초기화
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20">
            <p className="text-slate-400 text-sm">일치하는 프로젝트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative p-5 rounded-xl bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-950/50 cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                        LANGUAGE_COLORS[project.language] || LANGUAGE_COLORS.Other
                      }`}
                    >
                      {project.language}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span>{timeAgo(project.pushedAt)}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-slate-100 group-hover:text-indigo-300 transition-colors mb-2 break-all">
                    {project.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>
                </div>

                <div>
                  {project.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/80 text-slate-400 border border-slate-800"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs">
                    <div className="flex items-center gap-3 text-slate-400">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400" /> {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-slate-400" /> {project.forks}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-700/50 transition-colors font-medium flex items-center gap-1 cursor-pointer"
                      >
                        상세 보기 <ArrowUpRight className="w-3 h-3" />
                      </button>
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noreferrer"
                          title="Live Demo"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a
                        href={project.htmlUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="GitHub Repository"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p className="mb-2">
          © {new Date().getFullYear()} <strong>{data.username}</strong>. Hosted on GitHub Pages.
        </p>
        <p className="text-slate-600">
          Powered by Next.js & GitHub Actions · Automatically synced with GitHub Repositories.
        </p>
      </footer>
    </div>
  );
}
