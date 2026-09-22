export interface ArchitectureStep {
  layer: string;
  badge: string;
  badgeColor?: string;
  components: {
    title: string;
    desc: string;
    tech?: string;
  }[];
}

export interface ProjectArchitectureInfo {
  overview?: string;
  architecture?: string[];
  techStack?: {
    category: string;
    items: string[];
  }[];
  highlights?: string[];
  role?: string;
  diagram?: ArchitectureStep[];
}

// 주요 대표 프로젝트들의 심층 아키텍처 및 상세 소개 데이터
export const CURATED_PROJECT_DETAILS: Record<string, ProjectArchitectureInfo> = {
  "workplace-toolkit": {
    overview:
      "OpenAI Codex CLI 환경에서 팀과 개인이 안전하게 공유·재사용할 수 있는 엔터프라이즈급 업무 자동화 스킬(Skills) 패키지입니다. 개인 경로 및 사내 민감 데이터를 철저히 격리하며 리서치, 무결성 보존 PPT 번역, 회의/방문 보고서 자동화, 멀티미디어 발표 영상 제작 파이프라인을 제공합니다.",
    role: "AI Agent Skills Architecture & Workflow Engineering",
    techStack: [
      { category: "Agent & Automation", items: ["OpenAI Codex CLI", "Custom Skills Runtime", "Prompt Engineering"] },
      { category: "Document & XML Engine", items: ["Python 3.11+", "lxml (OOXML Parser)", "JSON Manifest Hashing"] },
      { category: "Media & Voice", items: ["Local TTS Engine", "Local ASR", "FFmpeg Multi-stream"] },
    ],
    architecture: [
      "원자적 매니페스트 해시 파이프라인: 원본 PPTX에서 OOXML 텍스트 노드를 추출하여 ID/해시 매핑 후 번역을 수행하여 레이아웃·서식 손실 원천 방지",
      "Zero Data Leakage 경계 설계: 사용자 로컬 환경과 승인된 도구 세션 내에서만 동작하며 외부로 사내 데이터 유출 차단",
      "CLI 기반 원자적 배포기: scripts/distribution.py를 통한 안전한 dry-run 및 무중단 스킬 설치/동기화 지원",
    ],
    highlights: [
      "4대 엔터프라이즈 핵심 스킬(workplace-research, ppt-translator, visit-call-report, presentation-studio) 완비",
      "부호, 통화, 단위, 보호 용어를 자동 검증하는 규칙 기반 무결성 검수기 탑재",
    ],
    diagram: [
      {
        layer: "1. Interface & Agent Layer",
        badge: "Codex CLI / Skill Spec",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Codex Skills Dispatcher", desc: "프롬프트 분석 및 스킬 라우팅", tech: "Codex Agent Runtime" },
          { title: "Distribution CLI", desc: "원자적 스킬 설치 및 환경 검증", tech: "Python Distribution CLI" },
        ],
      },
      {
        layer: "2. Automation & Pipeline Engine",
        badge: "Core Engines",
        badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
        components: [
          { title: "OOXML Parser & Hash Validator", desc: "PPTX 텍스트 노드 추출 및 번역 무결성 검증", tech: "lxml / JSON Manifest" },
          { title: "Report Synthesizer", desc: "고객사 미팅 메모 및 히스토리 기반 마크다운 표준화", tech: "Standard Formatter" },
        ],
      },
      {
        layer: "3. Local Media & Connectors",
        badge: "Local Runtime",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "TTS & ASR Speech Pipeline", desc: "로컬 음성 합성 및 발화 인식 검수", tech: "Local Speech Engine" },
          { title: "FFmpeg Studio", desc: "음성 타이밍에 동기화된 MP4 영상 및 SRT 자막 합성", tech: "FFmpeg Stream" },
        ],
      },
    ],
  },
  "ai-lecture-environment": {
    overview:
      "최신 엔터프라이즈 데이터베이스인 Oracle Database 23ai Free와 생성형 AI(RAG) 실습을 컨테이너 기반으로 즉시 구동하고, 코딩 에이전트(Codex)와 함께 인터랙티브하게 학습할 수 있는 올인원 셀프 데모·교육 플랫폼입니다.",
    role: "Full-Stack AI Lab Platform & Container Architecture",
    techStack: [
      { category: "Infrastructure & DevOps", items: ["Docker Compose v2", "Nginx Reverse Proxy", "Multi-arch (ARM64 / AMD64)"] },
      { category: "Database & Core", items: ["Oracle Database 23ai Free", "SQLAlchemy", "Vector / JSON Duality"] },
      { category: "App & Dashboard", items: ["FastAPI", "React 19 / Vite", "Supervisor Daemon"] },
    ],
    architecture: [
      "격리형 동적 데모 런타임 (Dynamic Demo Runtime): 수강생의 과제물(/labs/demos)을 독립 컨테이너 프로세스로 격리 구동하고 Supervisor로 라이프사이클 관리",
      "멀티 아키텍처 네이티브 대응: Apple Silicon (macOS arm64) 및 Windows/Linux (amd64) 전용 오케스트레이션 환경 파일 분리 제공",
      "실시간 헬스체크 및 프록시 라우팅: Nginx를 통해 UI(포트 8080)와 백엔드 API, 동적 데모 엔드포인트를 단일 진입점으로 통합 중계",
    ],
    highlights: [
      "사내 규정 문서 기반의 실무 RAG(검색, 출처 인용, 답변 생성) 코스웨어 기본 내장",
      "scripts/new-course.sh를 통한 신규 강의 커리큘럼 자동 스캐폴딩 지원",
    ],
    diagram: [
      {
        layer: "1. Client & Gateway Layer",
        badge: "Web & Reverse Proxy",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Interactive Lecture UI", desc: "실시간 퀴즈 및 데모 컨트롤러 대시보드", tech: "React 19 / Vite" },
          { title: "Nginx Gateway", desc: "API 및 동적 실습 엔드포인트 역방향 프록시", tech: "Nginx Reverse Proxy" },
        ],
      },
      {
        layer: "2. App & Sandbox Runtime",
        badge: "FastAPI & Supervisor",
        badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
        components: [
          { title: "Lab Supervisor Daemon", desc: "수강생 구현물 프로세스 격리 및 라이프사이클 관리", tech: "Supervisor Daemon" },
          { title: "FastAPI Controller", desc: "컨테이너 헬스체크 및 실습 메타데이터 동기화", tech: "Python FastAPI" },
        ],
      },
      {
        layer: "3. Database & Storage Layer",
        badge: "Oracle 23ai Free",
        badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
        components: [
          { title: "Oracle DB 23ai Free", desc: "벡터 임베딩 인덱스 및 JSON 관계형 듀얼리티 저장소", tech: "Oracle 23ai" },
          { title: "Persistent Storage Volumes", desc: "코스웨어 및 수강생 실습 데이터 보존", tech: "Docker Named Volumes" },
        ],
      },
    ],
  },
  "naver-blog-crawler": {
    overview:
      "특정 네이버 블로그의 모든 포스팅과 첨부 이미지를 전자동으로 전수 수집하여 로컬 마크다운 문서 및 이미지 아카이브로 변환·저장하는 CLI 도구이자 Claude Code 및 Codex 연동 AI 에이전트 스킬입니다.",
    role: "Web Scraping & Agent Skill Engineering",
    techStack: [
      { category: "Scraping & Parsing", items: ["Python 3.10+", "BeautifulSoup4", "Requests Session"] },
      { category: "Document Conversion", items: ["Markdownify", "HTML DOM Normalizer", "Relative Path Remapping"] },
      { category: "Agent Integration", items: ["Claude Code Skill (SKILL.md)", "Codex / Agent Instructions (AGENTS.md)"] },
    ],
    architecture: [
      "2단계 비동기 파이프라인: PostTitleListAsync.naver로 전체 logNo 목록을 페이지네이션 수집 후, 모바일 뷰(m.blog.naver.com)로부터 본문 및 이미지 고속 추출",
      "안전한 Rate Limiting & 지능형 지연: IP 차단 및 캡차 발생을 원천 방지하기 위해 요청 간 0.7초 안전 딜레이 적용",
      "로컬 상대경로 자동 리매핑: 이미지를 output/{logNo}/images/에 보존하고 마크다운 본문의 img 태그를 상대경로로 자동 변환",
    ],
    highlights: [
      "개인 블로그 전수 백업 및 옵시디언/노션 이관용 마크다운 완벽 지원",
      "AI 코딩 도구(Claude Code, Codex)에서 대화형으로 즉시 구동 가능한 스킬 매니페스트 포함",
    ],
    diagram: [
      {
        layer: "1. Trigger & Interface",
        badge: "CLI / Agent Skill",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
        components: [
          { title: "CLI Argument Parser", desc: "블로그 ID, 출력 경로, 딜레이 옵션 처리", tech: "Python Argparse" },
          { title: "Claude Code / Codex Skill", desc: "자연어 프롬프트 기반 크롤링 명령 바인딩", tech: "SKILL.md & AGENTS.md" },
        ],
      },
      {
        layer: "2. Scraper & Content Normalizer",
        badge: "Crawling Engine",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Async List Collector", desc: "PostTitleListAsync 기반 페이지 단위 logNo 전수 수집", tech: "Requests API" },
          { title: "Mobile DOM Cleaner", desc: "스마트에디터 3.0 / 본문 HTML 정리 및 노이즈 제거", tech: "BeautifulSoup4" },
        ],
      },
      {
        layer: "3. Local Storage & Markdown Generator",
        badge: "Archive Engine",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Markdownify Transformer", desc: "HTML 요소를 표준 마크다운 문법으로 변환", tech: "Markdownify" },
          { title: "Image Asset Archiver", desc: "이미지 스트리밍 다운로드 및 상대경로 리매핑", tech: "File System Stream" },
        ],
      },
    ],
  },
  dcimg: {
    overview:
      "디시인사이드의 특정 태그([ㅇㅎ]) 게시글을 실시간 베스트와 마이너 갤러리 검색 결과로부터 수집하여 카드 형태로 시각화해 주는 Next.js 웹 애플리케이션입니다.",
    role: "Full-Stack Architecture & Development",
    techStack: [
      { category: "Frontend", items: ["Next.js 16 (App Router)", "React 19", "TypeScript", "CSS Modules"] },
      { category: "Server & Scraping", items: ["Node.js Route Handlers", "Custom HTML Streaming Parser"] },
      { category: "Testing & DevOps", items: ["Vitest (125 tests)", "Playwright E2E", "ESLint 9"] },
    ],
    architecture: [
      "요청 구동 점진적 수집 (Progressive Deep Scan): 첫 진입 시 실베 1페이지만 빠르게 로딩 후, 20~40초 간격으로 실베(1~15p)와 마이너 검색(1~20p) 과거 페이지를 순차 수집",
      "인메모리 FIFO 상한 보존: 별도 DB 없이 서버 프로세스 메모리에서 최대 100개 카드 관리, 초과 시 가장 오래된 글부터 자동 탈락",
      "CDN 핫링크 우회 프록시 (/api/image-proxy): 디시인사이드 CDN Referer 검증 통과를 위한 실시간 이미지 중계 스트리밍",
      "크래시 복구 수퍼바이저: 프로세스 비정상 종료 감지 및 자동 재시작 데몬 스크립트 구축",
    ],
    highlights: [
      "모든 카드가 작성 일시(postedAt) 기준 최신순으로 자동 정렬되어 신규 글이 항상 최상단에 노출",
      "외부 사이트 iframe 차단 설정에 대비한 샌드박스 모달 뷰어 및 새 탭 대체 링크 지원",
    ],
    diagram: [
      {
        layer: "1. Presentation Layer",
        badge: "Client / React 19",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "PostBoard & Cards", desc: "실시간 반응형 카드 그리드 & 갤러리 필터", tech: "CSS Modules" },
          { title: "usePostBoardData Hook", desc: "20~40초 간격 점진적 폴링 & 썸네일 캐시 보존", tech: "React Hooks" },
        ],
      },
      {
        layer: "2. Application & In-Memory Service",
        badge: "Edge / Next.js Server",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "Progressive Posts Service", desc: "인메모리 FIFO 100개 상한 관리 & 최신순 정렬", tech: "State Machine" },
          { title: "Image Streaming Proxy", desc: "디시 CDN Referer 검증 우회 실시간 스트리밍", tech: "Web Streams API" },
        ],
      },
      {
        layer: "3. External Source Layer",
        badge: "Target Sites / CDN",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "DCInside HTML Source", desc: "실시간 베스트 & 마이너 검색 HTML 파싱", tech: "HTML Parser" },
          { title: "DC Image CDN", desc: "핫링크 보호 이미지 에셋 호스트", tech: "HTTP / Referer Check" },
        ],
      },
    ],
  },
  "fastfind-mac": {
    overview:
      "macOS 환경에서 대규모 디렉토리와 소스 코드를 밀리초 단위로 초고속 검색할 수 있는 네이티브 스타일의 파일 검색 유틸리티입니다.",
    role: "macOS Tooling & Search Architecture",
    techStack: [
      { category: "Core Engine", items: ["Rust", "ripgrep engine", "fd-find"] },
      { category: "Platform", items: ["macOS Native", "Swift / Tauri", "Zsh Integration"] },
    ],
    architecture: [
      "멀티스레드 기반 비동기 인덱싱 및 캐싱 파이프라인으로 수십만 개 파일 0.1초 내 탐색",
      "스마트 대소문자 매칭 및 gitignore 자동 준수 규칙 적용",
    ],
    highlights: ["터미널 CLI 및 GUI 환경 모두에서 직관적인 단축키 검색 지원"],
    diagram: [
      {
        layer: "1. User Interface",
        badge: "macOS Desktop / CLI",
        badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
        components: [
          { title: "Spotlight-like Search Box", desc: "글로벌 핫키 즉시 실행 및 검색창", tech: "Swift UI / CLI" },
          { title: "Result Preview Pane", desc: "구문 강조(Syntax Highlight) 및 파일 미리보기", tech: "Native View" },
        ],
      },
      {
        layer: "2. High-Performance Engine",
        badge: "Native Rust Engine",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
        components: [
          { title: "Ripgrep & fd Pipeline", desc: "멀티스레드 파일 및 텍스트 패턴 스캔", tech: "Rust / Parallelism" },
          { title: "Smart Cache Index", desc: "최근 조회 및 변경된 파일 인메모리 인덱싱", tech: "LRU Memory Cache" },
        ],
      },
      {
        layer: "3. OS & Filesystem",
        badge: "macOS Kernel",
        badgeColor: "bg-slate-500/20 text-slate-300 border-slate-500/40",
        components: [
          { title: "APFS Filesystem", desc: "macOS 파일 시스템 직접 I/O 접근", tech: "POSIX APIs" },
          { title: "FSEvents API", desc: "실시간 파일 생성/삭제/변경 이벤트 감지", tech: "Darwin Kernel" },
        ],
      },
    ],
  },
  "mentor-lane-voice-lab": {
    overview:
      "멘토링 및 교육을 위한 한국어 드라이브스루 음성 주문 인터랙션 데모 시스템입니다. 실시간 음성 인식과 합성, 거대언어모델(LLM)을 결합하여 실제 매장 주문 환경을 시뮬레이션합니다.",
    role: "AI Voice Pipeline & System Design",
    techStack: [
      { category: "AI & Voice", items: ["ElevenLabs STT / TTS", "OpenAI GPT-4o", "Prompt Engineering"] },
      { category: "Backend", items: ["Python", "FastAPI", "WebSocket Realtime Stream"] },
      { category: "Frontend", items: ["React", "Web Audio API", "Tailwind CSS"] },
    ],
    architecture: [
      "WebSocket 실시간 양방향 오디오 스트리밍을 통한 초저지연(Low Latency) 대화 루프 구현",
      "주문 메뉴 상태 관리 유한 상태 머신(FSM)과 LLM 함수 호출(Function Calling) 결합",
    ],
    highlights: [
      "한국어 자연어 드라이브스루 주문(옵션 추가, 수량 변경 등) 문맥 유지 처리",
      "음성 대화형 온보딩 및 멘토링 데모 시연 최적화",
    ],
    diagram: [
      {
        layer: "1. Speech Client",
        badge: "Browser Audio",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Audio Input Stream", desc: "마이크 오디오 PCM 버퍼링 및 노이즈 필터링", tech: "Web Audio API" },
          { title: "Real-time TTS Player", desc: "수신된 오디오 청크 끊김 없는 스트리밍 재생", tech: "AudioContext" },
        ],
      },
      {
        layer: "2. Voice Gateway & Logic",
        badge: "FastAPI / WebSocket",
        badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
        components: [
          { title: "WebSocket Router", desc: "양방향 오디오 패킷 송수신 및 세션 관리", tech: "Python AsyncIO" },
          { title: "Order State Machine", desc: "주문 내역 검증 및 Function Calling 연동", tech: "FSM Engine" },
        ],
      },
      {
        layer: "3. AI Services",
        badge: "LLM & Voice AI",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "ElevenLabs STT/TTS", desc: "실시간 고품질 한국어 음성 인식 및 음성 합성", tech: "Streaming API" },
          { title: "OpenAI GPT-4o", desc: "드라이브스루 주문 의도 파악 및 대화 생성", tech: "Function Calling" },
        ],
      },
    ],
  },
  "mentor-memory-fragments": {
    overview:
      "기억의 조각: 어르신이나 멘티의 추억 사진을 바탕으로 AI 인터뷰를 진행하고 맞춤형 회고록 및 추억 엽서를 생성해 주는 로컬 우선(Local-first) PWA 서비스입니다.",
    role: "PWA & AI Interview Experience",
    techStack: [
      { category: "Application", items: ["Next.js", "PWA (Progressive Web App)", "IndexedDB (Local-first)"] },
      { category: "Speech & AI", items: ["Web Speech API", "OpenAI Vision & Text", "Canvas Image Generation"] },
    ],
    architecture: [
      "네트워크 단절 상황에서도 작성 가능한 오프라인 우선(Local-first IndexedDB) 아키텍처",
      "사진 업로드 시 이미지 분석 기반 맞춤형 회고 질문 자동 생성",
    ],
    highlights: ["추억 엽서 인쇄 및 디지털 아카이브 PDF 내보내기 기능 제공"],
    diagram: [
      {
        layer: "1. PWA Client Application",
        badge: "Offline-Ready PWA",
        badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
        components: [
          { title: "Interactive Voice Interviewer", desc: "음성 대화형 인터뷰 및 텍스트 자동 기록", tech: "Web Speech API" },
          { title: "Postcard Canvas Generator", desc: "추억 사진 및 회고 문구 합성 엽서 렌더러", tech: "HTML5 Canvas" },
        ],
      },
      {
        layer: "2. Local-first Storage",
        badge: "Client Database",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
        components: [
          { title: "IndexedDB Engine", desc: "오프라인 사진 바이너리 및 인터뷰 텍스트 암호화 저장", tech: "Local Storage" },
          { title: "Service Worker Cache", desc: "네트워크 단절 시에도 애플리케이션 리소스 캐싱", tech: "Workbox / PWA" },
        ],
      },
      {
        layer: "3. Multimodal AI Integration",
        badge: "OpenAI Cloud",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "GPT-4o Vision API", desc: "사진 배경/사물 인식 및 감성 회고 질문 생성", tech: "Vision Model" },
          { title: "Memoir Synthesizer", desc: "인터뷰 내용 기반 정제된 회고록 문장 생성", tech: "Generative AI" },
        ],
      },
    ],
  },
  seven2: {
    overview:
      "세븐스플릿(Seven Split) 투자 원칙에 따라 해외 주요 ETF 및 자산을 가격 구간별로 분할 매수/매도할 수 있도록 지원하는 투자 관리 및 시뮬레이션 플랫폼입니다.",
    role: "FinTech Logic & Data Modeling",
    techStack: [
      { category: "Data & Engine", items: ["Python", "Pandas", "Yahoo Finance API", "NumPy"] },
      { category: "Web Interface", items: ["TypeScript", "Next.js", "Chart.js / Recharts"] },
    ],
    architecture: [
      "구간별 매수 평단가 자동 계산 및 목표 수익률 도달 시 자동 청산 시그널 알고리즘",
      "과거 시장 급락기/상승기 시뮬레이션을 통한 백테스팅 엔진",
    ],
    highlights: ["감정 개입을 배제한 규칙 기반 분할 매매 대시보드 시각화"],
    diagram: [
      {
        layer: "1. Portfolio Dashboard",
        badge: "Next.js / Charting",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Position Grid View", desc: "차수별(1~7차) 매수 단가 및 수익률 실시간 표시", tech: "React / Recharts" },
          { title: "Trade Signal Alerts", desc: "구간별 목표가 도달 시 매도/매수 알림 팝업", tech: "Web Notification" },
        ],
      },
      {
        layer: "2. Seven-Split Calculation Engine",
        badge: "Python / Quant Logic",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
        components: [
          { title: "Dynamic Split Algorithm", desc: "하락폭에 따른 가중 분할 매수 비율 자동 산출", tech: "NumPy / Pandas" },
          { title: "Historical Backtester", desc: "과거 금융 위기 시뮬레이션을 통한 MDD 검증", tech: "Time Series Data" },
        ],
      },
      {
        layer: "3. Market Data Providers",
        badge: "Financial APIs",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Yahoo Finance API", desc: "해외 ETF(SPY, QQQ 등) 일봉/실시간 주가 수집", tech: "REST API / Quotes" },
          { title: "Currency Exchange Rate", desc: "실시간 환율 반영 및 원화/달러 평가 손익 환산", tech: "Forex API" },
        ],
      },
    ],
  },
  "MSA-k8s-cicd": {
    overview:
      "Kubernetes 환경에서 MongoDB, PostgreSQL을 사용하는 마이크로서비스 및 Istio 서비스 메시, ArgoCD 기반의 GitOps CI/CD 인프라 아키텍처 샘플입니다.",
    role: "Cloud Native & DevOps Architecture",
    techStack: [
      { category: "Container & Orchestration", items: ["Kubernetes", "Docker", "Istio Service Mesh"] },
      { category: "CI/CD & GitOps", items: ["ArgoCD", "GitLab CI", "Helm Charts"] },
      { category: "Observability", items: ["Prometheus", "Grafana", "Kiali", "Jaeger"] },
    ],
    architecture: [
      "Istio Envoy Sidecar 프록시를 통한 서비스 간 트래픽 라우팅 및 mTLS 보안 통신",
      "GitLab CI 파이프라인 빌드 및 ArgoCD를 통한 선언적 GitOps 자동 배포",
    ],
    diagram: [
      {
        layer: "1. GitOps & Ingress Layer",
        badge: "ArgoCD & Gateway",
        badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/40",
        components: [
          { title: "Istio Ingress Gateway", desc: "외부 트래픽 라우팅 및 TLS 종료, 인증 인가", tech: "Envoy Proxy" },
          { title: "ArgoCD GitOps Operator", desc: "Git 저장소 선언적 Helm 차트 자동 동기화", tech: "Kubernetes CRD" },
        ],
      },
      {
        layer: "2. Microservices & Mesh",
        badge: "Kubernetes Cluster",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Node.js / Python Services", desc: "도메인별 비즈니스 로직 독립 파드(Pod) 배포", tech: "Microservices" },
          { title: "Service Mesh Observability", desc: "서비스 간 트래픽 추적 및 분산 트레이싱", tech: "Kiali / Jaeger" },
        ],
      },
      {
        layer: "3. Polyglot Persistence Layer",
        badge: "Stateful Sets",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "PostgreSQL StatefulSet", desc: "트랜잭션 정형 데이터 영구 볼륨 저장", tech: "Relational DB" },
          { title: "MongoDB ReplicaSet", desc: "비정형 문서 및 로그 데이터 고가용성 클러스터", tech: "NoSQL DB" },
        ],
      },
    ],
  },
  "how-to-use-OCI": {
    overview:
      "도서 『바로 쓰는 오라클 클라우드 - Build and Deploy Modern Apps with Oracle Cloud』의 전체 실습 소스코드 및 클라우드 네이티브 아키텍처 가이드 저장소입니다. OCI(Oracle Cloud Infrastructure)를 활용한 컨테이너 기반 마이크로서비스 배포, IaC(Terraform) 자동화, 자율운영 데이터베이스(Autonomous DB) 연동 및 엔터프라이즈 모던 앱 개발 기법을 제공합니다.",
    role: "도서 저술 및 OCI 클라우드 네이티브 실습 아키텍처 설계",
    techStack: [
      { category: "Cloud & Infrastructure", items: ["Oracle Cloud Infrastructure (OCI)", "OKE (Kubernetes)", "Compute & VCN", "Autonomous DB"] },
      { category: "DevOps & IaC", items: ["Terraform", "OCI Resource Manager", "Docker", "GitHub Actions"] },
      { category: "Application & Guides", items: ["Jupyter Notebook", "Python", "Node.js", "REST APIs"] },
    ],
    architecture: [
      "클라우드 네이티브 풀스택 아키텍처: VCN 네트워크 가상화부터 OKE 컨테이너 클러스터, Autonomous Database 연동까지의 전 주기 구성",
      "Terraform 기반 IaC 자동화: OCI 인프라 리소스를 코드로 손쉽게 프로비저닝하고 배포하는 자동화 템플릿 제공",
      "단계별 실습 가이드: 챕터별 핸즈온 랩(Hands-on Lab)과 실전 예제 코드로 클라우드 전환 및 모던 앱 배포 파이프라인 완성",
    ],
    highlights: [
      "도서 『바로 쓰는 오라클 클라우드』 공식 실습 레퍼런스 저장소",
      "엔터프라이즈 환경에 바로 적용 가능한 OCI 클라우드 네이티브 모범 사례 및 튜토리얼 수록",
    ],
    diagram: [
      {
        layer: "1. Hands-on Labs & Client Layer",
        badge: "Jupyter / CLI / IaC",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Interactive Lab Notebooks", desc: "도서 챕터별 단계적 클라우드 실습 가이드", tech: "Jupyter / Python" },
          { title: "Terraform IaC Templates", desc: "원클릭 OCI 클라우드 인프라 자동 배포 코드", tech: "Terraform HCL" },
        ],
      },
      {
        layer: "2. Cloud Native Infrastructure (OCI)",
        badge: "OCI Managed Services",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "OKE (Container Engine)", desc: "컨테이너 기반 마이크로서비스 및 워크로드 관리", tech: "Kubernetes / Docker" },
          { title: "API Gateway & Load Balancer", desc: "외부 트래픽 제어, 라우팅 및 SSL 종료", tech: "OCI Gateway" },
        ],
      },
      {
        layer: "3. Data & Enterprise Backends",
        badge: "Autonomous DB / Storage",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Autonomous Database", desc: "자동 튜닝/보안 적용 고성능 트랜잭션 & 분석 DB", tech: "Oracle DB 23c" },
          { title: "OCI Object Storage & Vault", desc: "대용량 비정형 데이터 및 보안 키 관리", tech: "Object Storage / KMS" },
        ],
      },
    ],
  },
  "genai-benchmark": {
    overview:
      "OCI Generative AI의 OpenAI 호환 엔드포인트를 대상으로 프롬프트 세트를 반복 주입하여 모델별(OpenAI, Gemini, Grok, Meta Llama) 지연시간(Latency), 처리량(tokens/sec), streaming TTFT(첫 토큰 도달 시간), 성공률을 정밀 측정하고 인터랙티브 대시보드로 시각화하는 Python CLI 벤치마크 도구입니다.",
    role: "LLM 성능 벤치마크 CLI 및 대시보드 엔지니어링",
    techStack: [
      { category: "Core & Engine", items: ["Python 3.10+", "Asyncio", "NumPy", "HTTPX / Requests"] },
      { category: "LLM Endpoints", items: ["OCI Generative AI", "OpenAI API", "Gemini", "Grok / Meta"] },
      { category: "Analytics & Docs", items: ["Static HTML Dashboard", "SVG Chart Generator", "GitHub Pages CI/CD"] },
    ],
    architecture: [
      "비동기 동시성 프롬프트 러너: 다중 스레드/비동기 태스크 기반으로 대규모 프롬프트 세트 반복 주입 및 오류 격리",
      "p50/p95/p99 지연시간 및 TTFT 계측: 응답 헤더 스트리밍 청크 단위로 첫 토큰 시간 및 엔드-투-엔드 토큰 속도 정밀 계산",
      "무의존성 정적 대시보드 생성: 외부 대형 라이브러리 없이 독립 실행 가능한 경량 SVG 인터랙티브 차트 및 HTML 보고서 렌더링",
    ],
    highlights: [
      "평균/p95/p99 지연시간, 초당 출력 토큰수, TTFT 정밀 계측",
      "GitHub Pages를 통한 벤치마크 리포트 대시보드 무인 자동 배포",
    ],
    diagram: [
      {
        layer: "1. CLI & Benchmark Runner",
        badge: "Python CLI / Asyncio",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Prompt Suite Injector", desc: "도메인별 벤치마크 프롬프트 세트 비동기 주입", tech: "Asyncio / HTTPX" },
          { title: "Run Configuration CLI", desc: "반복 횟수, 모델 타겟, 동시성 파라미터 제어", tech: "Argparse CLI" },
        ],
      },
      {
        layer: "2. Metric Evaluation Engine",
        badge: "Core Profiler",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "TTFT & Token Meter", desc: "첫 토큰 도달 시간(TTFT) 및 초당 토큰 속도 계측", tech: "Streaming Parser" },
          { title: "Percentile Aggregator", desc: "p50 / p95 / p99 레이턴시 및 에러율 통계 산출", tech: "NumPy Stats" },
        ],
      },
      {
        layer: "3. Dashboard & Doc Publishing",
        badge: "SVG & GitHub Pages",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Standalone HTML Dashboard", desc: "외부 종속성 없는 인터랙티브 SVG 차트 렌더링", tech: "HTML5 / SVG" },
          { title: "Automated Pages Release", desc: "벤치마크 결과 GitHub Pages 자동 아카이빙", tech: "GitHub Actions" },
        ],
      },
    ],
  },
  "hwpx-to-pdf-codex-skill": {
    overview:
      "한글과컴퓨터 오피스나 LibreOffice, 유료 상용 SDK 없이 순수 오픈소스 파이썬 생태계만으로 한국어 .hwpx 문서를 벡터 기반 검색 가능한 로컬 PDF로 변환하는 Codex 스킬 및 무손실 문서 변환 파이프라인입니다.",
    role: "한글 문서 벡터 렌더링 파이프라인 및 Codex 스킬 개발",
    techStack: [
      { category: "Document Rendering", items: ["rHWP Engine", "CairoSVG", "PyPDF", "Python 3"] },
      { category: "System & Architecture", items: ["Subprocess Isolation", "Codex Skill System", "macOS launchd"] },
      { category: "Typography", items: ["Apple SD Gothic Neo", "Noto Sans CJK KR", "Font Matching"] },
    ],
    architecture: [
      "페이지별 서브프로세스 렌더링 격리: rHWP의 복합 표 및 도형 처리 시 발생하는 메모리/렌더러 불안정성을 회피하기 위해 페이지 단위 서브프로세스 분리 실행",
      "무손실 벡터 PDF 파이프라인: HWPX XML 파싱 → 페이지별 SVG 렌더링 → CairoSVG 기반 벡터 PDF 생성 → PyPDF 무손실 병합",
      "텍스트 검색 인덱스 보존: 이미지 래스터화가 아닌 완전한 텍스트 벡터 객체를 보존하여 한글 검색 및 복사 지원",
    ],
    highlights: [
      "상용 오피스 프로그램이나 유료 클라우드 변환 API 의존성 100% 제거",
      "Codex 스킬 명령어($hwpx-to-pdf)로 AI 에이전트 워크플로우에 즉시 통합",
    ],
    diagram: [
      {
        layer: "1. Skill Interface & Input",
        badge: "Codex / Terminal CLI",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Codex Skill Wrapper", desc: "단일/디렉토리 일괄 HWPX 변환 트리거", tech: "Codex Skill Spec" },
          { title: "Font & Config Resolver", desc: "OS별 기본 한글 폰트 매핑 및 옵션 파싱", tech: "CLI Options" },
        ],
      },
      {
        layer: "2. Isolated Page Vector Engine",
        badge: "Python Subprocesses",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "rHWP SVG Extractor", desc: "HWPX XML 구조 해석 및 페이지별 SVG 벡터 추출", tech: "rHWP Library" },
          { title: "CairoSVG Vector Compiler", desc: "페이지별 SVG를 독립 벡터 PDF 객체로 컴파일", tech: "CairoSVG" },
        ],
      },
      {
        layer: "3. Assembly & Validation Layer",
        badge: "Searchable PDF Output",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "PyPDF Merger & Verifier", desc: "페이지 결합 및 원본 페이지 수 정합성 자동 검증", tech: "PyPDF Engine" },
          { title: "Searchable Vector PDF", desc: "한글 텍스트 검색 및 드래그 복사가 가능한 완성본", tech: "PDF 1.7 Spec" },
        ],
      },
    ],
  },
  "mer-macro-system": {
    overview:
      "미국 연방준비은행(FRED)의 핵심 거시경제 지표를 자동 수집하고, 경제 전문 블로그 '메르' 특유의 인사이트 넘치는 해석 프레임으로 일간/주간 매크로 리포트, 텔레그램 브리핑 메시지, 모바일 최적화 고해상도 차트를 자동 발행하는 매크로 인텔리전스 시스템입니다.",
    role: "거시경제 데이터 파이프라인 및 멀티채널 자동 리포팅 시스템 설계",
    techStack: [
      { category: "Data Ingestion", items: ["Python 3", "FRED API", "Pandas", "NumPy"] },
      { category: "Analysis & Agent", items: ["OpenClaw Workflow", "Claude Code / Codex", "Macro Insight Prompting"] },
      { category: "Visualization & Push", items: ["Matplotlib (Mobile Optimized)", "Telegram Bot API", "Markdown Engine"] },
    ],
    architecture: [
      "시계열 거시경제 지표 자동 수집: 미 국채 금리 스프레드, 인플레이션, 실업률 등 주요 FRED 지표 정기 크롤링",
      "메르식 해석 문장 생성 파이프라인: 지표 변동 맥락과 시장 영향도를 분석하여 읽기 쉬운 구어체 브리핑 문장 생성",
      "모바일 가독성 차트 & 텔레그램 발행: 스마트폰 화면에 최적화된 폰트 크기와 여백을 갖춘 차트 렌더링 후 텔레그램 채널 즉시 전송",
    ],
    highlights: [
      "OpenClaw, Claude Code, Codex 어디서나 clone하여 즉시 사용할 수 있는 재사용 운영 패키지",
      "수작업 1시간 이상의 매크로 지표 정리 작업을 10초 무인 파이프라인으로 단축",
    ],
    diagram: [
      {
        layer: "1. Data Collection Layer",
        badge: "FRED Economic Ingestion",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "FRED Time-series Fetcher", desc: "연준 주요 거시지표(기준금리, CPI, 스프레드) 수집", tech: "FRED API / Pandas" },
          { title: "Data Clean & Normalizer", desc: "결측치 보정 및 전월/전년 대비 변동률 자동 산출", tech: "NumPy Processing" },
        ],
      },
      {
        layer: "2. Analysis & Narrative Engine",
        badge: "LLM Narrative Workflow",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "Macro Interpretation Prompt", desc: "경제 현상을 맥락 중심으로 설명하는 프롬프트 프레임", tech: "Prompt Framework" },
          { title: "Mobile Chart Generator", desc: "모바일 화면 맞춤형 고대비 시계열 차트 이미지 생성", tech: "Matplotlib Custom" },
        ],
      },
      {
        layer: "3. Multi-Channel Dispatcher",
        badge: "Telegram & Markdown",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Telegram Channel Bot", desc: "핵심 요약 카드 + 차트 실시간 텔레그램 푸시", tech: "Telegram Bot API" },
          { title: "Markdown Archive", desc: "아카이브용 일간/주간 정밀 마크다운 리포트 저장", tech: "Markdown Generator" },
        ],
      },
    ],
  },
  "ppt-translator": {
    overview:
      "파워포인트(.ppt, .pptx) 슬라이드의 텍스트 박스, 표, 복합 도형 레이아웃을 100% 원본 그대로 유지하면서 내용을 한국어로 정밀 번역하는 LLM 번역 엔진 및 macOS launchd 기반 무인 자동화 워크스페이스입니다.",
    role: "오피스 문서 레이아웃 보존 번역 엔진 및 macOS 백그라운드 자동화 구축",
    techStack: [
      { category: "Document Engineering", items: ["Python 3", "python-pptx", "XML Slide Parser"] },
      { category: "AI & Translation", items: ["OpenAI API", "Context-Aware Prompting", "Technical Glossary Mapping"] },
      { category: "OS Automation", items: ["macOS launchd Daemon", "Folder Watcher (Inbox/Outbox)", "Shell Automation"] },
    ],
    architecture: [
      "슬라이드 XML 트리 노드 탐색: 파워포인트 내부 Shape 트리를 재귀 순회하여 서식, 위치, 글꼴 속성을 보존한 채 텍스트만 정밀 추출",
      "문맥 보존 번역 프롬프트: 슬라이드 전체의 맥락과 전문 기술 용어를 유지하며 번역문 길이가 도형을 넘치지 않도록 글자 수 조절",
      "macOS launchd 무인 데몬: 지정된 Inbox 폴더에 영문 PPT 파일을 넣으면 10분 내로 자동 감지·번역하여 Outbox로 산출",
    ],
    highlights: [
      "디자인 깨짐 없는 슬라이드 레이아웃 100% 보존 번역",
      "맥 전용 백그라운드 무인 폴더 감시 시스템 지원",
    ],
    diagram: [
      {
        layer: "1. macOS Watcher & Inbox",
        badge: "macOS Background Daemon",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "launchd Folder Watcher", desc: "Inbox 폴더 내 신규 영문 PPT/PPTX 주기적 감시", tech: "launchd Daemon" },
          { title: "Document Queue Manager", desc: "중복 번역 방지 및 상태 트래킹 락(Lock) 관리", tech: "File State Engine" },
        ],
      },
      {
        layer: "2. Slide Node & Translation Core",
        badge: "Shape Tree & LLM",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "Shape Tree Traversal", desc: "표, 도형, 그룹 내 텍스트 블록과 스타일 좌표 추출", tech: "python-pptx" },
          { title: "Context-Aware LLM Translator", desc: "전문 용어 사전 적용 및 글자 수 비례 번역문 생성", tech: "OpenAI API" },
        ],
      },
      {
        layer: "3. Reconstruction & Outbox",
        badge: "Preserved PPTX Output",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Layout-Preserving Injector", desc: "기존 폰트 크기/색상/배치 그대로 번역문 재주입", tech: "XML Reconstruction" },
          { title: "Outbox Delivery", desc: "번역 완료 파일 정리 및 알림 피드백", tech: "Local Filesystem" },
        ],
      },
    ],
  },
  "oci-osaka-gpt-oss-chat": {
    overview:
      "OCI(Oracle Cloud Infrastructure) Osaka 리전의 고성능 오픈소스 LLM(openai.gpt-oss-20b, 120b)을 LangChain과 oci-openai 엔드포인트를 통해 실시간 스트리밍으로 대화할 수 있는 반응형 챗봇 웹 애플리케이션입니다.",
    role: "OCI 클라우드 호스팅 오픈소스 LLM 연동 및 Streamlit 챗 웹앱 개발",
    techStack: [
      { category: "Frontend / UI", items: ["Streamlit", "Responsive Chat Interface"] },
      { category: "LLM Framework", items: ["LangChain", "langchain-openai", "oci-openai"] },
      { category: "Cloud & Models", items: ["OCI Generative AI (Osaka Region)", "gpt-oss-20b / 120b", "OCI IAM Auth"] },
    ],
    architecture: [
      "OCI Osaka 리전 전용 가속기 연동: 오사카 리전 인프라에 배포된 대규모 오픈소스 가중치 모델 직접 호출",
      "LangChain 토큰 스트리밍: 실시간 SSE 스트림을 가로채어 타이핑 효과가 적용된 부드러운 대화형 UI 제공",
      "OCI IAM 네이티브 보안 인증: 클라우드 API 키 및 테넌시 자격증명 기반의 안전한 보안 통신 터널 구축",
    ],
    highlights: [
      "OCI 인프라 기반의 프라이빗 OSS LLM 서빙 실증",
      "Streamlit 기반의 가볍고 빠른 반응형 웹 챗 인터페이스",
    ],
    diagram: [
      {
        layer: "1. Presentation Layer",
        badge: "Streamlit UI",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Streamlit Chat Interface", desc: "대화형 메시지 뷰어 및 스트리밍 타이핑 효과", tech: "Streamlit" },
          { title: "Session State Manager", desc: "사용자 세션별 대화 컨텍스트 및 히스토리 유지", tech: "Python State" },
        ],
      },
      {
        layer: "2. LangChain Orchestration",
        badge: "LangChain & Transport",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "langchain-openai Wrapper", desc: "OpenAI 호환 인터페이스로 OCI 엔드포인트 추상화", tech: "LangChain Core" },
          { title: "oci-openai Auth Adapter", desc: "OCI 테넌시 IAM 서명 및 TLS 보안 헤더 전송", tech: "OCI Auth" },
        ],
      },
      {
        layer: "3. OCI GenAI Cluster (Osaka)",
        badge: "ap-osaka-1 Cloud Service",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "gpt-oss-20b / 120b Models", desc: "오사카 리전 GPU 클러스터 가동 오픈소스 LLM", tech: "OSS Foundation Model" },
          { title: "High-Throughput Serving", desc: "전용 호스팅 인프라 기반 초저지연 토큰 추론", tech: "OCI GPU Cluster" },
        ],
      },
    ],
  },
  "oracle-facts-query": {
    overview:
      "Oracle 제품군 기술 명세, 신규 릴리즈 기능, 가격 비교, 벤치마크 결과 등 방대한 기술 노트를 기반으로 신뢰성 높은 출처 인용과 함께 정확한 답변을 제공하고 실시간 소스를 관리하는 지식 베이스 에이전트 스킬입니다.",
    role: "기술 지식 베이스 RAG 에이전트 및 소스 관리 워크플로우 설계",
    techStack: [
      { category: "Agent & Skill", items: ["Claude Code Skill", "Codex Tooling", "Prompt Architecture"] },
      { category: "Knowledge Base", items: ["Oracle Facts Notebook", "Markdown Knowledge Graph", "Citation Engine"] },
      { category: "Search & Retrieval", items: ["Semantic Context Matcher", "Structured Facts Query", "CLI Tools"] },
    ],
    architecture: [
      "이중 동작 모드 (Query & Source Add): 공식 기술 노트 질의응답 모드와 신규 소스 수집·인덱싱 모드 지원",
      "신뢰성 기반 출처 인용 엔진: 환각(Hallucination) 방지를 위해 모든 답변에 원본 문서 챕터 및 URL 출처 표기 의무화",
      "구조화된 팩트 지식베이스: 제품 기능, 가격, 기술 사양, 경쟁사 비교 데이터를 구조화된 마크다운 데이터로 유지 관리",
    ],
    highlights: [
      "Oracle 관련 기술 질의에 대해 공식 근거 기반 신뢰성 100% 답변 제공",
      "Claude Code 스킬로 통합되어 개발 및 컨설팅 도중 터미널에서 즉시 쿼리",
    ],
    diagram: [
      {
        layer: "1. User Query & Skill Interface",
        badge: "Claude Code CLI",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Facts Query Skill", desc: "제품 기능, 가격, 사양, 공지사항 자연어 쿼리 접수", tech: "Claude Code Skill" },
          { title: "Source Add Mode", desc: "새로운 기술 블로그/문서 수집 및 지식베이스 추가", tech: "Ingestion CLI" },
        ],
      },
      {
        layer: "2. Facts Index & Retrieval",
        badge: "Knowledge Retriever",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "Oracle Facts Notebooks", desc: "체계화된 제품/아키텍처/비용 비교 마크다운 데이터", tech: "Markdown Index" },
          { title: "Citation Matcher", desc: "질의 의도에 최적화된 공식 레퍼런스 단락 추출", tech: "Semantic Matcher" },
        ],
      },
      {
        layer: "3. Synthesis & Citation Output",
        badge: "Verified Knowledge",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Fact-checked Answer", desc: "환각 없는 검증된 사실 기반 핵심 요약 답변", tech: "LLM Synthesizer" },
          { title: "Verified Source Citations", desc: "공식 문서 링크 및 챕터 레퍼런스 인용 태그", tech: "Citation Engine" },
        ],
      },
    ],
  },
  "openclaw-agent-operating-bp": {
    overview:
      "OpenClaw 자율 AI 에이전트 시스템을 안정적으로 구축하고 운영하기 위한 모범 사례, 부트스트랩 템플릿, 영속적 메모리(Persistent Memory) 설계 및 품질 검증 워크플로우를 체계화한 지식 자산 저장소입니다.",
    role: "자율 AI 에이전트 아키텍처 패턴 정립 및 운영 프레임워크 설계",
    techStack: [
      { category: "Agent Architecture", items: ["OpenClaw Framework", "Multi-Agent Workflows", "Agent Personas"] },
      { category: "Memory & State", items: ["Persistent Long-term Memory", "Context Compaction", "State Machine"] },
      { category: "Operational Patterns", items: ["Autonomous Review Loops", "Bootstrap Blueprints", "Verification Rules"] },
    ],
    architecture: [
      "정제된 재사용 지식 자산: 단순 로그 덤프가 아닌 실제 자동화 업무에서 검증된 핵심 원칙과 베스트 프랙티스만 추출",
      "에이전트 부트스트랩 청사진: 새로운 에이전트 초기화 시 도구 권한, 작업 바운딩, 페르소나를 신속하게 배포하는 템플릿",
      "자율 검증 및 리뷰 파이프라인: 에이전트 수행 결과물의 품질을 스스로 검증하고 회고하는 폐루프(Closed-loop) 워크플로우",
    ],
    highlights: [
      "현업 프로덕션 수준 자율 AI 에이전트 구축 운영 가이드라인",
      "대규모 컨텍스트 낭비를 방지하는 영속 메모리 관리 전략 수록",
    ],
    diagram: [
      {
        layer: "1. Bootstrap & Identity Layer",
        badge: "Agent Blueprint",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Bootstrap Template", desc: "에이전트 역할, 도구 권한, 기본 규칙 선언", tech: "System Config" },
          { title: "Workspace Initialization", desc: "독립된 작업 공간과 도구 바운딩 격리", tech: "Environment Setup" },
        ],
      },
      {
        layer: "2. Memory & Execution Engine",
        badge: "State & Context Engine",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "Context Compactor", desc: "대화 및 작업 히스토리의 핵심 인사이트 압축", tech: "Memory Engine" },
          { title: "Tool Execution Supervisor", desc: "파일 조작 및 터미널 명령어 안전 실행 감시", tech: "Policy Guard" },
        ],
      },
      {
        layer: "3. Review & Feedback Loop",
        badge: "Autonomous Review",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Output Self-Verification", desc: "생성 결과물의 완성도 및 린트/테스트 검증", tech: "Self-Review Loop" },
          { title: "Learned Knowledge Store", desc: "실행 과정에서 획득한 규칙의 영속적 기록", tech: "Knowledge Base" },
        ],
      },
    ],
  },
  "oci-genai-guide-maintenance": {
    overview:
      "OCI Generative AI, DAC, AQUA, IaaS GPU 리전별 서비스 출시 현황과 지원 모델 변경사항을 정기 추적하고, cron 및 Codex CLI 워크플로우를 결합하여 최신 리전 가이드를 무인으로 발행·갱신하는 자동화 시스템입니다.",
    role: "클라우드 AI 서비스 릴리즈 추적 및 가이드 자동 발행 파이프라인 구축",
    techStack: [
      { category: "Automation & Daemon", items: ["Linux Cron", "Bash Shell", "Codex CLI"] },
      { category: "Data Ingestion", items: ["OCI Documentation Feed", "OCI CLI", "Regional Matrix Parser"] },
      { category: "Docs & CI", items: ["Markdown Generator", "Git Automation", "Prompt-only Guides"] },
    ],
    architecture: [
      "일정 기반 무인 감시: cron 스케줄러로 OCI 글로벌 리전의 신규 GPU 및 모델 배포 변경 감지",
      "에이전트 프롬프트 문서 자동 빌드: AI 에이전트에 직접 컨텍스트로 주입할 수 있는 prompt-only 최신 리전 가이드 생성",
      "버전 태깅 및 Git 연동: 일자별 변경 내역이 포함된 문서를 자동 커밋하여 릴리즈 이력 추적",
    ],
    highlights: [
      "글로벌 멀티 리전 GPU/AI 모델 업데이트 수작업 조사 제로화",
      "Codex CLI와 결합한 고품질 기술 문서 자동 갱신 파이프라인",
    ],
    diagram: [
      {
        layer: "1. Scheduler & Detection",
        badge: "Linux Cron / Shell",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Cron Trigger", desc: "정기 주기로 OCI 리전 릴리즈 상태 감시 실행", tech: "Cron Scheduler" },
          { title: "OCI Docs & API Checker", desc: "DAC / AQUA / GPU 리전 신규 변경사항 추출", tech: "Bash / OCI CLI" },
        ],
      },
      {
        layer: "2. Codex Generation Workflow",
        badge: "Codex CLI Engine",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "Regional Matrix Synthesizer", desc: "리전별 GPU 모델 매트릭스 테이블 구조화", tech: "Codex CLI" },
          { title: "Prompt-Ready Formatter", desc: "에이전트 주입용 최적화 마크다운 문서 가공", tech: "Markdown Builder" },
        ],
      },
      {
        layer: "3. Publication & Git Sync",
        badge: "Automated Release",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Date-stamped Guide Files", desc: "일자별 최신 리전 가이드 문서 아카이빙", tech: "Versioned Docs" },
          { title: "Git Push Sync", desc: "원격 저장소 자동 동기화 및 릴리즈 갱신", tech: "Git Automation" },
        ],
      },
    ],
  },
  "JSON-demo-Advanced": {
    overview:
      "Oracle Database 23ai의 핵심 혁신 기능인 JSON Relational Duality View를 심층 실습할 수 있는 고급 가이드입니다. 관계형(RDB) 테이블과 NoSQL JSON 문서를 완전 동기화하고, ORDS 기반 MongoDB API 호환성을 활용하여 mongosh 등 NoSQL 도구 및 RESTful API를 무수정 연동합니다.",
    role: "23ai JSON Duality View 아키텍처 실습 설계 및 MongoDB 호환성 검증",
    techStack: [
      { category: "Database Engine", items: ["Oracle Database 23ai", "JSON Relational Duality View", "OSON Binary Format"] },
      { category: "APIs & Protocols", items: ["ORDS (Oracle REST Data Services)", "MongoDB Wire Protocol API", "RESTful Endpoints"] },
      { category: "Developer Tools", items: ["mongosh", "MongoDB Compass", "SQL Developer Web", "PL/SQL"] },
    ],
    architecture: [
      "JSON-RDB 양방향 무손실 동기화: JSON 문서 기반의 CRUD가 기저의 정규화된 RDB 테이블에 실시간 DML로 완벽 동기화",
      "ORDS 기반 MongoDB 드라이버 호환: mongosh, MongoDB Compass, 언어별 공식 MongoDB 어댑터 코드를 오라클 DB에 그대로 연결",
      "ACID 트랜잭션과 NoSQL 유연성의 결합: RDB의 강력한 데이터 무결성과 NoSQL의 개발 생산성을 단일 DB 엔진에서 동시 확보",
    ],
    highlights: [
      "현 DB 시장 최초 관계형-문서형 완전 동기화 기술 실전 실습 가이드",
      "기존 MongoDB 기반 애플리케이션의 오라클 23ai 마이그레이션 레퍼런스",
    ],
    diagram: [
      {
        layer: "1. Client Applications & Tools",
        badge: "MongoDB Native & REST",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "MongoDB Tools (mongosh, Compass)", desc: "오라클 DB에 직접 접속하여 NoSQL 문법으로 쿼리", tech: "MongoDB Ecosystem" },
          { title: "RESTful HTTP Clients", desc: "표준 JSON Payload 기반의 GET/POST/PUT/DELETE 요청", tech: "Web APIs" },
        ],
      },
      {
        layer: "2. Dual-Protocol Gateway (ORDS)",
        badge: "ORDS API Gateway",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "MongoDB Wire Protocol Translator", desc: "MongoDB API 호출을 내부 SQL/Duality 엔진으로 변환", tech: "ORDS Mongo API" },
          { title: "REST API Endpoint Generator", desc: "Duality View 기반 엔터프라이즈 REST 서비스 제공", tech: "ORDS REST Engine" },
        ],
      },
      {
        layer: "3. Oracle Database 23ai Core",
        badge: "Converged Database",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "JSON Relational Duality Views", desc: "RDB 조인 관계를 가상 NoSQL JSON 컬렉션으로 노출", tech: "Duality View DDL" },
          { title: "Underlying Relational Tables", desc: "완전한 ACID 트랜잭션 및 정규화 무결성 영구 보존", tech: "Oracle SQL Engine" },
        ],
      },
    ],
  },
  "JSON-demo": {
    overview:
      "Oracle Database 23ai의 JSON Relational Duality View를 처음 접하는 개발자를 위한 단계별 핸즈온 실습 가이드입니다. SQL Developer Web 환경에서 RDB 테이블 생성부터 JSON Duality View 선언, 데이터 조작까지 복사-붙여넣기로 따라 할 수 있도록 구성되었습니다.",
    role: "초심자 맞춤형 23ai JSON Duality View 핸즈온 콘텐츠 개발",
    techStack: [
      { category: "Database", items: ["Oracle Database 23ai", "JSON Duality View", "SQL"] },
      { category: "Tools & Interface", items: ["SQL Developer Web (Database Actions)", "PL/SQL Worksheet"] },
    ],
    architecture: [
      "직관적인 단계별 실습 흐름: 기본 정규화 테이블 정의 → 외래키 관계 수립 → JSON Duality View 생성 → DML 조작",
      "클라우드 웹 인터페이스 활용: 별도 로컬 설치 없이 브라우저의 SQL Developer Web에서 즉시 실습 가능",
    ],
    highlights: [
      "초심자도 10분 만에 23ai Duality View 개념을 체득할 수 있는 친절한 가이드",
      "50인 이상 단체 교육 및 워크샵에 최적화된 계정별 실습 구성",
    ],
    diagram: [
      {
        layer: "1. Web Worksheet Interface",
        badge: "Browser / SQL Dev Web",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Database Actions (SDW)", desc: "브라우저 기반 실시간 SQL 실행 및 결과 그리드 뷰", tech: "SQL Developer Web" },
          { title: "Multi-User Workspaces", desc: "user01~user50 독립 실습 환경 분리", tech: "Tenant Isolation" },
        ],
      },
      {
        layer: "2. Duality View Definition",
        badge: "DDL & GraphQL-like Schema",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "JSON View DDL Builder", desc: "테이블 간 JOIN 관계를 단일 계층형 JSON 문서 구조로 매핑", tech: "Oracle SQL DDL" },
          { title: "Update Annotations", desc: "INSERT/UPDATE/DELETE 허용 속성 선언", tech: "Duality Policy" },
        ],
      },
      {
        layer: "3. Persistence & Integrity",
        badge: "Oracle 23ai Storage",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Normalized Base Tables", desc: "정규화된 관계형 데이터 원본 테이블", tech: "Relational Schema" },
          { title: "ACID Guaranteed DML", desc: "JSON 수정 시 원본 RDB 레코드 실시간 트랜잭션 반영", tech: "ACID Engine" },
        ],
      },
    ],
  },
  "Pgvector-with-ann-benchmark": {
    overview:
      "PostgreSQL의 오픈소스 벡터 검색 확장인 pgvector를 대상으로, 대표적인 근사 최근접 이웃(ANN) 알고리즘(HNSW, IVFFlat)의 색인 속도, 질의 지연시간, 재현율(Recall)을 ann-benchmarks 프레임워크와 Docker 환경에서 정밀 계측·비교한 성능 벤치마크 프로젝트입니다.",
    role: "벡터 데이터베이스 성능 벤치마크 설계 및 ANN 색인 최적화 연구",
    techStack: [
      { category: "Vector Database", items: ["PostgreSQL", "pgvector", "HNSW Index", "IVFFlat Index"] },
      { category: "Benchmark Framework", items: ["ann-benchmarks", "HDF5 Datasets", "Docker", "Python 3"] },
      { category: "Cloud & Compute", items: ["AWS r6i.16xlarge (31 Parallelism)", "Linux NUMA Tuning"] },
    ],
    architecture: [
      "표준화된 ANN 벤치마크 규격 준수: glove, sift 등 표준 HDF5 고차원 벡터 데이터셋을 활용한 객관적 지표 산출",
      "Docker 격리 환경 파이프라인: 하이퍼스레딩 제어 및 멀티코어 병렬성 환경에서 환경 오염 없는 재현 가능한 벤치마크 구동",
      "Recall vs QPS 트레이드오프 분석: 인덱스 파라미터(m, ef_construction) 변화에 따른 검색 정확도 대비 처리량 곡선 시각화",
    ],
    highlights: [
      "대규모 벡터 워크로드에서 pgvector HNSW 인덱스의 실제 프로덕션 적합성 검증",
      "최신 인스턴스 환경에서 하드웨어 성능을 극대화하는 튜닝 파라미터 도출",
    ],
    diagram: [
      {
        layer: "1. Dataset & Runner",
        badge: "ann-benchmarks / HDF5",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "HDF5 Vector Dataset", desc: "표준 고차원 임베딩 벡터셋 (GLoVE / SIFT 등) 주입", tech: "HDF5 Data" },
          { title: "Benchmark Controller", desc: "동시성 및 병렬 스레드 제어 러너", tech: "Python / ann-benchmarks" },
        ],
      },
      {
        layer: "2. Isolated Vector Engine",
        badge: "Docker / pgvector",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "PostgreSQL with pgvector", desc: "컨테이너 격리 환경에서 벡터 확장 모듈 가동", tech: "PostgreSQL 16" },
          { title: "HNSW & IVFFlat Indexes", desc: "계층형 탐색 그래프(HNSW) 및 역색인(IVFFlat) 성능 측정", tech: "ANN Algorithms" },
        ],
      },
      {
        layer: "3. Evaluation & Profiling",
        badge: "Metrics & Tradeoffs",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Recall vs QPS Curves", desc: "재현율 목표치별 초당 쿼리 처리량(QPS) 산출", tech: "Matplotlib Charts" },
          { title: "Build Time & Size Profiler", desc: "인덱스 빌드 시간 및 디스크 메모리 점유율 분석", tech: "Performance Metrics" },
        ],
      },
    ],
  },
  "GenAI-youtube-recipe-app": {
    overview:
      "유튜브 요리 영상 URL을 입력하면 자막과 오디오를 실시간 분석하여 조리 순서, 필수 재료 목록, 계량 단위 및 셰프의 꿀팁을 생성형 AI로 일목요연하게 구조화해 주는 파이썬 기반 레시피 요약 웹 애플리케이션입니다.",
    role: "미디어 텍스트 추출 파이프라인 및 생성형 레시피 요약 웹앱 개발",
    techStack: [
      { category: "Frontend / UI", items: ["Streamlit", "Responsive Layout", "Recipe Cards"] },
      { category: "AI & Orchestration", items: ["LangChain", "OpenAI GPT-4o / GPT-3.5", "Structured Output Parsing"] },
      { category: "Data Ingestion", items: ["YouTube Transcript API", "pytube", "Python 3"] },
    ],
    architecture: [
      "영상 자막 자동 추출 및 전처리: 유튜브 URL에서 다국어 자막을 추출하고 타임스탬프와 노이즈 텍스트 정제",
      "LangChain 기반 레시피 정형화: 방대한 구어체 대화 속에서 요리 재료와 단계별 조리법을 JSON 스키마로 구조화",
      "스트리밍 응답 렌더링: 긴 분석 시간을 지루하지 않게 해주는 실시간 스트리밍 UI 및 공유 가능한 카드 뷰",
    ],
    highlights: [
      "10~20분 분량의 복잡한 요리 영상을 5초 만에 핵심 재료표와 조리법으로 요약",
      "Streamlit 기반으로 누구나 쉽게 사용할 수 있는 가벼운 인터페이스",
    ],
    diagram: [
      {
        layer: "1. User Input & Presentation",
        badge: "Streamlit Web UI",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "YouTube URL Input", desc: "요리 영상 링크 인입 및 썸네일 미리보기", tech: "Streamlit UI" },
          { title: "Recipe Summary Card", desc: "재료 체크리스트 및 단계별 조리 순서 렌더링", tech: "Markdown / Components" },
        ],
      },
      {
        layer: "2. Media Ingestion & Chunking",
        badge: "Transcript Extraction",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "YouTube Transcript Fetcher", desc: "영상 타임스탬프 자막 및 대화 텍스트 수집", tech: "YouTube Transcript API" },
          { title: "Noise Filter & Chunker", desc: "잡담 및 인트로/아웃트로 제거 후 텍스트 청킹", tech: "Python NLP" },
        ],
      },
      {
        layer: "3. Generative Structuring Engine",
        badge: "LangChain & GPT-4o",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Recipe Parser Chain", desc: "재료명, 용량, 조리팁을 정형 JSON 구조로 변환", tech: "LangChain Prompts" },
          { title: "OpenAI LLM Inference", desc: "요리 전문 문맥 추론 및 요약문 생성", tech: "OpenAI API" },
        ],
      },
    ],
  },
  "MongoDB-vs-Oracle-DB-23c-Free-perf-custom-app": {
    overview:
      "동일한 사양의 OCI VM 클라우드 인프라에서 순수 MongoDB 컬렉션과 Oracle DB 23c Free의 네이티브 JSON 컬렉션을 대상으로 Locust 분산 부하 도구를 적용하여 대규모 Insert/Select 부하에 대한 처리량(RPS)과 응답 지연 시간을 실측 비교한 성능 벤치마크 프로젝트입니다.",
    role: "NoSQL vs Converged Database 부하 성능 벤치마크 아키텍처 수립",
    techStack: [
      { category: "Load Testing", items: ["Locust (Distributed Load Testing)", "Python 3", "Virtual Users Simulation"] },
      { category: "Application Backend", items: ["Flask REST API", "PyMongo Driver", "python-oracledb Driver"] },
      { category: "Databases & Cloud", items: ["MongoDB Community", "Oracle Database 23c Free (OSON)", "OCI Compute (VM)"] },
    ],
    architecture: [
      "공정한 동일 스펙 비교 환경: OCI Compute 동일 VM Shape(1 OCPU, 16GB RAM)에 DB와 앱 서버 분리 배치",
      "이중 백엔드 어댑터: 동일한 JSON 도메인 모델을 대상으로 PyMongo와 python-oracledb 어댑터를 각각 독립 구현",
      "Locust 분산 부하 측정: 수백 명의 동시 가상 유저를 점진 증차하며 Insert 및 Select 작업의 Latency와 RPS를 실시간 측정",
    ],
    highlights: [
      "오라클 23c의 바이너리 JSON(OSON) 포맷이 순수 NoSQL인 MongoDB 대비 대등하거나 우수한 처리 성능 실측 확인",
      "엔터프라이즈 환경에서 NoSQL 도입 시 RDB Converged 엔진과의 객관적 비교 레퍼런스 제공",
    ],
    diagram: [
      {
        layer: "1. Distributed Load Generator",
        badge: "Locust Simulator",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Locust Workload Engine", desc: "동시 가상 사용자(VUser) 기반 Insert/Select 트래픽 발생", tech: "Locust / Python" },
          { title: "Real-time Metrics Dashboard", desc: "RPS, 평균/p95 레이턴시, 오류율 실시간 집계", tech: "Web UI Monitor" },
        ],
      },
      {
        layer: "2. Dual App Adapter Layer",
        badge: "Flask REST Services",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "MongoDB Driver Adapter", desc: "BSON 기반 도큐먼트 직렬화 및 PyMongo 클라이언트 호출", tech: "PyMongo" },
          { title: "Oracle DB Driver Adapter", desc: "OSON 바이너리 JSON 및 python-oracledb 연결", tech: "python-oracledb" },
        ],
      },
      {
        layer: "3. Database Engines on OCI",
        badge: "OCI VM Shapes",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "MongoDB Instance", desc: "NoSQL 도큐먼트 스토리지 및 인덱스 처리", tech: "MongoDB Engine" },
          { title: "Oracle DB 23c Free", desc: "바이너리 JSON 데이터 타입 및 네이티브 컬렉션 처리", tech: "Oracle DB 23c" },
        ],
      },
    ],
  },
  "AI-Demo": {
    overview:
      "LangChain 프레임워크와 로컬 오픈소스 LLM(Ollama, LLaMA 2) 및 프롬프트 엔지니어링 기법을 활용하여 비즈니스 답변 가이드 생성, 고객 리뷰 감정 분석, 마케팅 문구 제작, 장문 요약 등 생성형 AI 실무 유스케이스를 검증한 프로토타입 랩입니다.",
    role: "생성형 AI 실무 유스케이스 및 프롬프트 파이프라인 프로토타이핑",
    techStack: [
      { category: "AI Framework", items: ["LangChain", "Python 3", "Prompt Engineering"] },
      { category: "LLM Engines", items: ["LLaMA 2", "Ollama (Local LLM)", "OpenAI API"] },
      { category: "Techniques", items: ["Few-shot Prompting", "Chain-of-Thought", "Sentiment Analysis", "Text Summarization"] },
    ],
    architecture: [
      "실무 비즈니스 패턴별 프롬프트 모듈화: 마케팅 문구, 감정 분석, 요약 등 유스케이스별 재사용 프롬프트 템플릿 설계",
      "로컬-클라우드 하이브리드 LLM 지원: 민감 데이터는 로컬 Ollama(LLaMA 2)로 처리하고 고성능 추론은 OpenAI로 선택 연동",
      "체인 기반 파이프라인: 단순 질의응답을 넘어 이전 결과를 다음 단계의 입력으로 전달하는 다단계 추론 체인 구현",
    ],
    highlights: [
      "현업에서 바로 적용 가능한 프롬프트 엔지니어링 실무 템플릿 수록",
      "인터넷 연결 없이 로컬에서 완전 동작 가능한 프라이빗 LLM 실증",
    ],
    diagram: [
      {
        layer: "1. Business Use-Case Scenarios",
        badge: "Prompt Templates",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Marketing & Copywriting", desc: "타겟 고객층 맞춤형 매력적인 광고 문구 생성 템플릿", tech: "Few-shot Prompt" },
          { title: "Sentiment & Summarization", desc: "고객 리뷰 감정 추론 및 방대한 비정형 본문 요약", tech: "Chain-of-Thought" },
        ],
      },
      {
        layer: "2. LangChain Pipeline Engine",
        badge: "Chain Orchestration",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "PromptTemplate Assembler", desc: "동적 파라미터 주입 및 시스템 가이드라인 바인딩", tech: "LangChain Core" },
          { title: "Output Parser", desc: "비정형 텍스트를 구조화된 결과 포맷으로 파싱", tech: "Output Parsing" },
        ],
      },
      {
        layer: "3. Hybrid LLM Execution",
        badge: "Local & Cloud LLMs",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Ollama / LLaMA 2 (Local)", desc: "사내 보안 및 오프라인 환경을 위한 로컬 오픈소스 추론", tech: "Ollama Engine" },
          { title: "OpenAI GPT API (Cloud)", desc: "고난도 추론 및 대규모 문맥 처리를 위한 클라우드 엔드포인트", tech: "OpenAI Models" },
        ],
      },
    ],
  },
  "Demo-Clips": {
    overview:
      "Oracle Database 23ai JSON Duality View 실습, 『바로 쓰는 오라클 클라우드』 도서 핸즈온, DB 19c 무중단 업그레이드 등 주요 엔터프라이즈 클라우드 및 데이터베이스 기술의 실전 시연 영상을 집약한 인터랙티브 테크 쇼케이스 저장소입니다.",
    role: "엔터프라이즈 기술 시연 영상 제작 및 테크 쇼케이스 아카이빙",
    techStack: [
      { category: "Media & Presentation", items: ["YouTube Video Streaming", "Markdown Tech Showcase", "Screencasting"] },
      { category: "Featured Technologies", items: ["Oracle Database 23ai", "OCI Cloud Native", "Oracle DB 19c Upgrade", "NoSQL Duality"] },
    ],
    architecture: [
      "기술 주제별 비디오 큐레이션: 23ai 신기술, OCI 실무, 19c 마이그레이션 등 핵심 도메인별 시연 영상 구조화",
      "실습 코드 저장소와 직결: 각 영상마다 대응되는 핸즈온 코드 저장소와 공식 가이드 링크를 연계 제공",
    ],
    highlights: [
      "글이나 슬라이드만으로 이해하기 어려운 복잡한 클라우드 아키텍처의 실제 동작 화면 직관적 제공",
      "도서 독자 및 엔지니어를 위한 공식 데모 영상 레퍼런스 아카이브",
    ],
    diagram: [
      {
        layer: "1. Interactive Showcase Portal",
        badge: "Curated Index",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Domain Category Navigation", desc: "23ai Duality, OCI 클라우드, 19c 업그레이드별 분류", tech: "Markdown Index" },
          { title: "Quick-Jump Timestamps", desc: "핵심 기술 설명 구간별 타임스탬프 북마크", tech: "Video Navigation" },
        ],
      },
      {
        layer: "2. Live Screencast Player",
        badge: "High-Definition Video",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "Embedded Demo Streamer", desc: "고화질 실전 터미널 및 콘솔 조작 화면 시연", tech: "YouTube Embeds" },
          { title: "Architecture Overlays", desc: "시연 동작 시점별 논리 구성도 및 데이터 흐름 설명", tech: "Visual Guide" },
        ],
      },
      {
        layer: "3. Companion Repositories",
        badge: "Code & Reference",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Hands-on Code Links", desc: "시연에 사용된 실제 실습 깃허브 저장소 원클릭 연결", tech: "GitHub Repos" },
          { title: "Official Documentation", desc: "오라클 공식 기술 백서 및 도서 구매/실습 가이드 연결", tech: "Tech Docs" },
        ],
      },
    ],
  },
  "mredash": {
    overview:
      "다기종 데이터베이스(SQL, NoSQL, REST API)를 실시간 쿼리하고 인터랙티브 차트 및 대시보드로 시각화할 수 있는 오픈소스 비즈니스 인텔리전스(BI) 도구 Redash의 맞춤형 패키징 및 운영 환경입니다.",
    role: "BI 대시보드 플랫폼 구성 및 멀티 데이터소스 연동",
    techStack: [
      { category: "Platform & App", items: ["Redash", "Python", "Flask", "React"] },
      { category: "Task & Data Pipeline", items: ["Celery (Async Workers)", "Redis (Queue & Cache)", "PostgreSQL (Metadata)"] },
      { category: "Deployment", items: ["Docker", "Docker Compose"] },
    ],
    architecture: [
      "비동기 쿼리 디스패치 파이프라인: 대규모 무거운 쿼리를 Redis 큐와 Celery 워커로 비동기 처리하여 웹 UI 블로킹 방지",
      "이기종 데이터소스 통합: PostgreSQL, MySQL, Oracle, MongoDB, Google Sheets 등 다양한 소스를 단일 대시보드에 병합",
      "지표 알림 및 스케줄링: 주요 비즈니스 KPI 임계치 도달 시 슬랙 또는 이메일로 자동 경보 발송",
    ],
    highlights: [
      "복잡한 코딩 없이 SQL 작성만으로 5분 만에 인터랙티브 BI 대시보드 구축",
      "사내 지표 모니터링 및 실시간 비즈니스 데이터 시각화 플랫폼 제공",
    ],
    diagram: [
      {
        layer: "1. BI Dashboard & Visualization",
        badge: "React & Query Builder",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Interactive Widget Grid", desc: "차트, 피벗 테이블, 카운터 위젯 자유 배치 대시보드", tech: "React UI" },
          { title: "Parameterized SQL Editor", desc: "동적 필터 및 파라미터가 적용된 SQL 작성기", tech: "Monaco Editor" },
        ],
      },
      {
        layer: "2. Async Query Engine & Cache",
        badge: "Celery & Redis",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "Celery Distributed Workers", desc: "무거운 분석 쿼리를 백그라운드 워커로 분산 처리", tech: "Celery Task" },
          { title: "Redis Cache & Queue", desc: "쿼리 결과 인메모리 캐싱 및 반복 요청 즉시 응답", tech: "Redis Store" },
        ],
      },
      {
        layer: "3. Heterogeneous Connectors",
        badge: "Polyglot Data Sources",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Relational DB Connectors", desc: "PostgreSQL, MySQL, Oracle DB 실시간 쿼리 연동", tech: "SQL Adapters" },
          { title: "NoSQL & API Connectors", desc: "MongoDB 컬렉션 및 외부 REST API 데이터셋 통합", tech: "NoSQL / JSON" },
        ],
      },
    ],
  },
  "study": {
    overview:
      "분산 데이터베이스, 클라우드 네이티브 아키텍처, 알고리즘, 최신 웹 및 백엔드 기술의 핵심 개념을 실험하고 프로토타입을 신속하게 검증하는 R&D 및 기술 연구 아카이브입니다.",
    role: "기술 스택 연구 및 개념 증명(PoC) 프로토타이핑",
    techStack: [
      { category: "Languages & Scripting", items: ["Python", "Go", "TypeScript", "Shell"] },
      { category: "Domains & Research", items: ["System Architecture", "Database Internals", "Cloud Patterns", "Algorithms"] },
      { category: "Documentation", items: ["Markdown Logs", "PoC Codebases"] },
    ],
    architecture: [
      "도메인별 격리 샌드박스: 언어 및 프레임워크별 독립 디렉토리를 통해 간섭 없는 기술 실험 및 검증 수행",
      "이론과 구현의 연계: 컴퓨터 사이언스 기초 이론(동시성, 네트워크, DB 인덱스)을 실제 동작 코드로 구현하여 체득",
    ],
    highlights: [
      "새로운 신기술 도입 전 리스크를 사전 검증하는 선행 R&D 저장소",
      "실무 문제 해결을 위한 알고리즘 및 시스템 패턴 실험 기록 아카이빙",
    ],
    diagram: [
      {
        layer: "1. Research & Problem Definition",
        badge: "Investigation Scope",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Technical Topic Scoping", desc: "신규 프레임워크, 분산 패턴, 성능 병목 가설 수립", tech: "Research Plan" },
          { title: "Test Case Design", desc: "재현 가능한 벤치마크 및 검증 시나리오 설계", tech: "Test Harness" },
        ],
      },
      {
        layer: "2. PoC Prototyping & Sandbox",
        badge: "Multi-Language Labs",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "Minimal Working Code", desc: "핵심 알고리즘 및 아키텍처 패턴의 최소 단위 구현", tech: "Python / Go / TS" },
          { title: "Profiling & Optimization", desc: "메모리 점유율, 지연시간, 동시성 병목 분석", tech: "Profiler Tools" },
        ],
      },
      {
        layer: "3. Knowledge Synthesis",
        badge: "Engineering Library",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "Architectural Retrospectives", desc: "실험 결과 분석, 장단점 평가 및 실무 적용 방안", tech: "Markdown Notes" },
          { title: "Reusable Snippet Assets", desc: "실무 프로젝트에 즉시 이식 가능한 베스트 프랙티스 코드", tech: "Code Templates" },
        ],
      },
    ],
  },
};

// 커스텀 다이어그램이 없는 프로젝트를 위해 언어/토픽 기반으로 스마트 아키텍처 다이어그램 자동 생성
export function getProjectArchitecture(
  projectName: string,
  language: string,
  topics: string[] = [],
  homepage: string | null = null
): ArchitectureStep[] {
  const curated = CURATED_PROJECT_DETAILS[projectName];
  if (curated?.diagram && curated.diagram.length > 0) {
    return curated.diagram;
  }

  const isWeb =
    ["TypeScript", "JavaScript", "HTML", "CSS"].includes(language) ||
    topics.some((t) => ["nextjs", "react", "vue", "web", "pwa", "frontend"].includes(t.toLowerCase()));

  const isPython = language === "Python" || topics.some((t) => ["python", "django", "flask", "fastapi"].includes(t.toLowerCase()));
  const isAI = topics.some((t) => ["ai", "llm", "langchain", "openai", "machine-learning", "ml"].includes(t.toLowerCase()));

  if (isAI || (isPython && topics.some((t) => t.includes("langchain") || t.includes("demo")))) {
    return [
      {
        layer: "1. Client & Prompt Interface",
        badge: "User Interface",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "Interactive Prompt Terminal / UI", desc: "자연어 질의 및 파라미터 입력", tech: isWeb ? "Web Frontend" : "CLI / Script" },
        ],
      },
      {
        layer: "2. AI Orchestration Engine",
        badge: "Processing Layer",
        badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
        components: [
          { title: "Workflow Orchestrator", desc: "프롬프트 체이닝 및 문맥/컨텍스트 파이프라인", tech: "Python / Framework" },
        ],
      },
      {
        layer: "3. Model & External Services",
        badge: "AI & External API",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: "LLM Inference API", desc: "언어 모델 추론 및 구조화된 결과 생성", tech: "AI Model Provider" },
        ],
      },
    ];
  }

  if (isWeb) {
    return [
      {
        layer: "1. Client Presentation",
        badge: "Browser Application",
        badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
        components: [
          { title: "Responsive Web UI", desc: "사용자 인터랙션 및 상태 기반 렌더링", tech: language || "JavaScript" },
        ],
      },
      {
        layer: "2. Build & Application Logic",
        badge: "Application Layer",
        badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        components: [
          { title: "Component State & Business Logic", desc: "비동기 데이터 흐름 및 유틸리티 로직", tech: "Modern Framework" },
        ],
      },
      {
        layer: "3. Deployment & Distribution",
        badge: "Hosting & CDN",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        components: [
          { title: homepage ? "Live Production Site" : "Static Asset Distribution", desc: "글로벌 엣지 배포 및 고속 캐싱", tech: homepage ? "Web Service" : "GitHub Pages" },
        ],
      },
    ];
  }

  // 기본 표준 3단 아키텍처
  return [
    {
      layer: "1. Input & Interface",
      badge: "Entry Layer",
      badgeColor: "bg-slate-500/20 text-slate-300 border-slate-500/40",
      components: [
        { title: "Execution Trigger & Arguments", desc: "사용자 입력 및 설정 옵션 파싱", tech: language },
      ],
    },
    {
      layer: "2. Core Logic & Processing",
      badge: "Core Engine",
      badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
      components: [
        { title: "Business Logic Pipeline", desc: "데이터 가공, 연산 및 유효성 검증", tech: `${language} Runtime` },
      ],
    },
    {
      layer: "3. Output & Persistence",
      badge: "Output Layer",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      components: [
        { title: "System Output & Result Artifacts", desc: "결과물 출력, 파일 저장 또는 API 응답", tech: "Result Provider" },
      ],
    },
  ];
}
