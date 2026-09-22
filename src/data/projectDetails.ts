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
