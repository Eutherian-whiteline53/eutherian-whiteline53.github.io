export interface ProjectArchitectureInfo {
  overview?: string;
  architecture?: string[];
  techStack?: {
    category: string;
    items: string[];
  }[];
  highlights?: string[];
  role?: string;
}

// 주요 대표 프로젝트들의 심층 아키텍처 및 상세 소개 데이터
export const CURATED_PROJECT_DETAILS: Record<string, ProjectArchitectureInfo> = {
  dcimg: {
    overview:
      "디시인사이드의 특정 태그([ㅇㅎ]) 게시글을 실시간 베스트와 마이너 갤러리 검색 결과로부터 수집하여 카드 형태로 시각화해 주는 Next.js 웹 애플리케이션입니다.",
    role: "Full-Stack Architecture & Development",
    techStack: [
      { category: "Frontend", items: ["Next.js 16 (App Router)", "React 19", "TypeScript", "CSS Modules"] },
      { category: "Server & Scraping", items: ["Node.js Edge / Route Handlers", "Custom HTML Streaming Parser"] },
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
  },
};
