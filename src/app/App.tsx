import { Layout } from "widgets/layout";
import "./styles/index.css";
import { ProjectDashboard } from "widgets/project-dashboard";

export function App() {
  return <Layout sidebarBody={<ProjectDashboard />}>app</Layout>;
}
