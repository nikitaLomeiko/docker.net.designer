import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  applyNodeChanges,
  Connection,
  Edge,
  NodeChange,
  BackgroundVariant,
  NodeTypes,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { addNewEdge, changeNode, changeNodes, useCurrentProject } from "entities/project";
import { ComponentType, useCallback, useState } from "react";
import { Modal } from "shared/ui/modal";

interface IProps {
  dockerNodeTypes: NodeTypes;
  toolbar: React.ReactNode;
  PathForm: ComponentType<any>;
}

export const DockerConstructor: React.FC<IProps> = (props) => {
  const { dockerNodeTypes, toolbar, PathForm } = props;

  const currentProject = useCurrentProject();

  const [openModal, setOpenModal] = useState(false);
  const [currentEdge, setCurrentEdge] = useState<{
    source: string;
    target: string;
  }>();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      changeNodes(applyNodeChanges(changes, currentProject?.nodes || []));
    },
    [currentProject?.nodes]
  );

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      addNewEdge({ id: String(Date.now()), source: params.source, target: params.target });

      if (currentProject?.nodes.find((node) => node.id === params.target)?.type === "volume") {
        setCurrentEdge({ source: params.source, target: params.target });
        setOpenModal(true);
      }
    },
    [currentProject?.nodes]
  );

  const onChangeVolume = (path: string) => {
    const nodeSource = currentProject?.nodes.find((nodeItem) => nodeItem.id === currentEdge?.source);
    const nodeTarget = currentProject?.nodes.find((nodeItem) => nodeItem.id === currentEdge?.target);

    if (nodeSource?.data && nodeTarget?.data) {
      nodeSource.data.volumes = [...((nodeSource.data.volumes as string[]) || []), `${nodeTarget.data.name}:${path}`];
      changeNode(nodeSource);
    }
  };

  return (
    <>
      <ReactFlow
        minZoom={0.1}
        nodes={currentProject?.nodes || []}
        edges={currentProject?.edges || []}
        nodeTypes={dockerNodeTypes}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        fitView
      >
        <Panel position="bottom-center">{toolbar}</Panel>
        <Controls />
        <MiniMap className="xl:block hidden" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <PathForm onSubmit={onChangeVolume} onCancel={() => setOpenModal(false)} />
      </Modal>
    </>
  );
};
