import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  BackgroundVariant,
  NodeTypes,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { addNewEdge, changeNodes, useCurrentProject } from "entities/project";
import { useCallback } from "react";

interface IProps {
  dockerNodeTypes: NodeTypes;
  toolbar: React.ReactNode;
}

export const DockerConstructor: React.FC<IProps> = (props) => {
  const { dockerNodeTypes, toolbar } = props;

  const currentProject = useCurrentProject();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      changeNodes(applyNodeChanges(changes, currentProject?.nodes || []));
    },
    [currentProject?.nodes]
  );

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    // setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot));
  }, []);

  const onConnect = useCallback((params: Connection | Edge) => {
    addNewEdge({ id: String(Date.now()), source: params.source, target: params.target });
  }, []);

  return (
    <ReactFlow
      minZoom={0.1}
      nodes={currentProject?.nodes || []}
      edges={currentProject?.edges || []}
      nodeTypes={dockerNodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Panel position="bottom-center">{toolbar}</Panel>
      <Controls />
      <MiniMap className="xl:block hidden" />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  );
};
