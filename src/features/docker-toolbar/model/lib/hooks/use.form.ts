import { addNewNode, changeNode } from "entities/project";
import { useState } from "react";

interface IProps {
  isChanged?: boolean;
  changedId?: string;
  typeNode?: string;
  onCancel: () => void;
}

export const useForm = <T>(data: Partial<T>, props: IProps) => {
  const { isChanged = false, changedId = "", typeNode = "service", onCancel } = props;

  const [activeSection, setActiveSection] = useState("basic");

  const [formData, setFormData] = useState<Partial<T>>(data);

  const handleChangeFormData = (key: keyof T, value: T[keyof T]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log(formData);
    e.preventDefault();

    if (isChanged) {
      changeNode({ id: changedId, data: { ...formData } });
    } else {
      addNewNode({
        id: String(Date.now()),
        position: { x: 0, y: 0 },
        type: typeNode,
        data: { ...formData },
      });
    }

    onCancel();
  };

  return { activeSection, formData, setActiveSection, handleChangeFormData, handleSubmit };
};
