import React, { ComponentType } from "react";
import { IFormProps } from "./form.props.type";

export interface IToolbar {
  id: number;
  name: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  form: ComponentType<IFormProps>;
}
