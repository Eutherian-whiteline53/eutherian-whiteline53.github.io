import projectsData from "@/data/projects.json";
import PortfolioView, { type PortfolioData } from "@/components/PortfolioView";

export default function Home() {
  return <PortfolioView data={projectsData as PortfolioData} />;
}
