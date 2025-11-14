import { NodeWrapper } from "./components/node.wrapper";
import { ServiceConfig } from "../model/types/docker.type";
import { NodePropsType } from "../model/types/node.type";
import { ContainerIcon } from "./icons/container.icon";
import { ImageIcon } from "./icons/image.icon";
import { CommandIcon } from "./icons/command.icon";
import { PortIcon } from "./icons/port.icon";
import { RestartIcon } from "./icons/restart.icon";
import { UserIcon } from "./icons/user.icon";
import { FolderIcon } from "./icons/folder.icon";
import { Environment } from "./components/enviroment";
import { Volumes } from "./components/volumes";
import { PropertyDisplay } from "./components/property.display";
import { PropertyItem } from "./components/property.item";
import { NodeLayout } from "./components/node.layout";

interface IProps {
  data: ServiceConfig;
  node: NodePropsType;
}

export type ServiceNodeName = "service";

export const ServiceNode: React.FC<IProps> = ({ data, node }) => {
  return (
    <NodeWrapper onDelete={node.onDelete} id={node.id} data={data} form={node.changeForm} typeHandle="source">
      <NodeLayout
        icon={<ContainerIcon />}
        color="blue"
        id={node.id}
        label="Docker Service"
        name={data.container_name || "Unnamed Service"}
        nameFooter="Service Ready"
      >
        {data.image && <PropertyDisplay icon={<ImageIcon />} label="Images" value={data.image} />}

        {data.command && (
          <PropertyDisplay
            color="red"
            icon={<CommandIcon />}
            label="Command"
            value={typeof data.command === "string" ? data.command : data.command.join(" ")}
          />
        )}

        {data.ports && data.ports.length > 0 && (
          <PropertyDisplay color="green" icon={<PortIcon />} label="Ports">
            {data.ports.map((port, index) => (
              <PropertyItem index={index} item={port} />
            ))}
          </PropertyDisplay>
        )}

        <Volumes volumes={data.volumes} />

        <Environment environment={data.environment} />

        {data.restart && data.restart !== "no" && (
          <PropertyDisplay color="cyan" icon={<RestartIcon />} label="Restart Policy" value={data.restart} />
        )}

        {data.user && <PropertyDisplay icon={<UserIcon />} label="User" value={data.user} />}

        {data.working_dir && (
          <PropertyDisplay color="amber" icon={<FolderIcon />} label="Working Directory" value={data.working_dir} />
        )}

        {data.entrypoint && <PropertyDisplay icon={<FolderIcon />} label="Entrypoint" value={data.entrypoint} />}
      </NodeLayout>
    </NodeWrapper>
  );
};
