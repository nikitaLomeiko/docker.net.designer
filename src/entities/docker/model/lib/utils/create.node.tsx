import { Node, NodeProps } from "@xyflow/react";

export function createCustomNode<T extends Record<string, unknown>, K extends string>(
  NodeComponent: React.ComponentType<any>,
  FormCompoent: React.ComponentType<any>,
  onDelete: (id: string) => void
) {
  const CustomNode: React.FC<NodeProps<Node<T, K>>> = ({ data, id }) => (
    <NodeComponent data={data} node={{ changeForm: FormCompoent, id, onDelete: () => onDelete(id) }} />
  );

  return CustomNode;
}
