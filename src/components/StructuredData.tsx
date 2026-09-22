import projectsData from "@/data/projects.json";
import { CURATED_PROJECT_DETAILS } from "@/data/projectDetails";

export default function StructuredData() {
  const allowedProjects = projectsData.projects.filter(
    (p) => !p.isFork || p.name === "how-to-use-OCI"
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://dontotl.github.io/#website",
        "url": "https://dontotl.github.io",
        "name": "dontotl.systems",
        "alternateName": "Building Autonomous AI & Cloud-Native Systems",
        "description":
          "데이터베이스 코어부터 클라우드 인프라, 자율형 AI 에이전트까지 — 시스템의 시작과 끝을 설계하고 코드로 증명합니다. OCI 도서 저술, Oracle DB 23ai, Pgvector ANN, LLM 벤치마크 아키텍처 포트폴리오.",
        "inLanguage": "ko-KR",
        "publisher": {
          "@type": "Person",
          "@id": "https://dontotl.github.io/#author",
          "name": "dontotl",
          "url": "https://github.com/dontotl",
        },
      },
      {
        "@type": "ProfilePage",
        "@id": "https://dontotl.github.io/#profile",
        "url": "https://dontotl.github.io",
        "name": "dontotl.systems | Building Autonomous AI & Cloud-Native Systems",
        "isPartOf": {
          "@id": "https://dontotl.github.io/#website",
        },
        "mainEntity": {
          "@type": "Person",
          "@id": "https://dontotl.github.io/#author",
          "name": "dontotl",
          "alternateName": "dontotl.systems",
          "jobTitle": "Autonomous AI & Cloud-Native Systems Architect",
          "description":
            "도서 '바로 쓰는 오라클 클라우드' 저자이자 데이터베이스 코어, 클라우드 네이티브 인프라, 자율형 AI 에이전트를 연구하고 구축하는 시스템 아키텍트.",
          "url": "https://dontotl.github.io",
          "sameAs": [
            "https://github.com/dontotl",
            "https://www.youtube.com/@dba2331",
          ],
          "knowsAbout": [
            "Oracle Cloud Infrastructure (OCI)",
            "Oracle Database 23ai",
            "JSON Relational Duality View",
            "pgvector & Approximate Nearest Neighbor (ANN)",
            "Large Language Model (LLM) Performance Benchmarking",
            "Autonomous AI Agents",
            "Database Internals & Performance Engineering",
            "Cloud-Native Systems Architecture",
          ],
        },
      },
      {
        "@type": "ItemList",
        "@id": "https://dontotl.github.io/#projects",
        "name": "Curated Engineering & Architecture Projects",
        "description": "21 Curated Cloud-Native, AI Agent, and Database Engineering Projects",
        "numberOfItems": allowedProjects.length,
        "itemListElement": allowedProjects.map((project, index) => {
          const curated = CURATED_PROJECT_DETAILS[project.name];
          const isBook = project.name === "how-to-use-OCI";
          const techList = curated?.techStack
            ? curated.techStack.flatMap((s) => s.items)
            : project.topics;

          return {
            "@type": isBook ? "CreativeWork" : "SoftwareSourceCode",
            position: index + 1,
            name: project.name,
            description: curated?.overview || project.description,
            url: `https://dontotl.github.io/#${project.name}`,
            codeRepository: project.htmlUrl,
            programmingLanguage: project.language || "Multi-language",
            keywords: techList.join(", "),
            author: {
              "@type": "Person",
              name: "dontotl",
            },
          };
        }),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
