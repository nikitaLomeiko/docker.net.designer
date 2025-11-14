import { Layout } from "widgets/layout";
import "./styles/index.css";
import { ProjectDashboard } from "widgets/project-dashboard";
import { DockerWorksapce } from "widgets/docker-workspace";

export function App() {
  return (
    <Layout sidebarBody={<ProjectDashboard />}>
      <DockerWorksapce />
    </Layout>
  );
}
