import { Layout } from "widgets/layout";
import "./styles/index.css";
import { ProjectDashboard } from "widgets/project-dashboard";
import { DockerWorksapce } from "widgets/docker-workspace";
import { LoadingScreen } from "./provider/loading-screen";

export function App() {
  return (
    <LoadingScreen>
      <Layout sidebarBody={<ProjectDashboard />}>
        <DockerWorksapce />
      </Layout>
    </LoadingScreen>
  );
}
