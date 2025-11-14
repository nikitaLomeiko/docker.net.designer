import { ComponentType } from "react";

export type NodePropsType = {
  id: string;
  changeForm: ComponentType<any>;
  onDelete: () => void;
};
