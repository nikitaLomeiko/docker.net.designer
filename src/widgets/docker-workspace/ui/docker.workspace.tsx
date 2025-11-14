import React from "react";
import {
  ConfigConfig,
  NetworkConfig,
  SecretConfig,
  ServiceConfig,
  ServiceNode,
  VolumeConfig,
  ConfigNodeName,
  NetworkNodeName,
  SecretNodeName,
  ServiceNodeName,
  VolumeNodeName,
  createCustomNode,
  NetworkNode,
  VolumeNode,
  SecretNode,
  ConfigNode,
} from "entities/docker";
import { ConfigForm, NetworkForm, SecretForm, ServiceForm, Toolbar, VolumeForm } from "features/docker-toolbar";
import { DockerConstructor } from "features/docker-constructor";
import { deleteNode } from "entities/project";

type NodeNames = ServiceNodeName | NetworkNodeName | VolumeNodeName | SecretNodeName | ConfigNodeName;

const dockerNodes: Record<NodeNames, any> = {
  service: createCustomNode<ServiceConfig, ServiceNodeName>(ServiceNode, ServiceForm, deleteNode),
  network: createCustomNode<NetworkConfig, NetworkNodeName>(NetworkNode, NetworkForm, deleteNode),
  volume: createCustomNode<VolumeConfig, VolumeNodeName>(VolumeNode, VolumeForm, deleteNode),
  secret: createCustomNode<SecretConfig, SecretNodeName>(SecretNode, SecretForm, deleteNode),
  config: createCustomNode<ConfigConfig, ConfigNodeName>(ConfigNode, ConfigForm, deleteNode),
};

export const DockerWorksapce: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <DockerConstructor dockerNodeTypes={dockerNodes} toolbar={<Toolbar />} />
    </div>
  );
};
