import { convertDockerComposeToReactFlow } from "shared/utils/converting/convert.docker.to.react.flow";
import { addNewProject, IProject } from "entities/project";
import { FileInput } from "shared/ui/file-input";
import { generateId } from "shared/utils/generate.id";
import { useCallback } from "react";
import yaml from "js-yaml";

export const FileDockerInput: React.FC = () => {
  const handleFileConverted = (jsonData: any, fileName: string) => {
    const { nodes, edges } = convertDockerComposeToReactFlow(jsonData);
    const newProject: IProject = {
      id: generateId(),
      name: fileName,
      nodes,
      edges,
    };
    addNewProject(newProject);
  };

  const onProcessFile = useCallback((file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const yamlContent = e.target?.result as string;
        const jsonData = yaml.load(yamlContent);

        handleFileConverted(jsonData, file.name);
      } catch (err: any) {
        console.error(err);
      }
    };

    reader.readAsText(file);
  }, []);

  return <FileInput onFileSelected={onProcessFile} acceptedFileTypes=".yml,.yaml,application/x-yaml,text/yaml" />;
};
