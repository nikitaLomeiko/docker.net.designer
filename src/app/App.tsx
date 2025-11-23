import { Layout } from "widgets/layout";
import "./styles/index.css";
import { ProjectDashboard } from "widgets/project-dashboard";
import { DockerWorksapce } from "widgets/docker-workspace";
import { LoadingScreen } from "./provider/loading-screen";
import { Lobby } from "widgets/lobby";
import { useCurrentProject } from "entities/project";

export function App() {
  const currentProject = useCurrentProject();
  return (
    <LoadingScreen>
      <Layout sidebarBody={<ProjectDashboard />}>
        {currentProject === undefined ? <Lobby /> : <DockerWorksapce />}
      </Layout>
    </LoadingScreen>
  );
}
