import { Handle, Position } from "@xyflow/react";
import { ComponentType, ReactNode, useState } from "react";

interface IProps {
  children: ReactNode;
  typeHandle: "source" | "target";
  form: ComponentType<any>;
  onDelete: () => void;
  data: any;
  id: string;
}

export const NodeWrapper: React.FC<IProps> = (props) => {
  const { children, typeHandle, form: ChangeForm, data, id, onDelete } = props;

  const [isEdit, setEdit] = useState(false);

  return (
    <div className="custom-node bg-white rounded-2xl shadow-lg border border-gray-200/60 hover:shadow-xl transition-all duration-300">
      <div className="node-content p-6 flex flex-col gap-5">
        {isEdit ? <ChangeForm id={id} initialData={data} isEdit onCancel={() => setEdit(false)} /> : children}

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => setEdit(true)}
            className="p-3 bg-blue-50 text-blue-600 rounded-xl transition-all duration-200 hover:bg-blue-100 hover:scale-105 active:scale-95"
            title="Изменить"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            onClick={onDelete}
            className="p-3 bg-red-50 text-red-600 rounded-xl transition-all duration-200 hover:bg-red-100 hover:scale-105 active:scale-95"
            title="Удалить"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <Handle
        className="w-10 h-10 bg-gradient-to-br scale-350 from-blue-400 to-blue-600 border-2 border-white shadow-lg hover:from-blue-500 hover:to-blue-700 transition-all"
        type={typeHandle}
        position={typeHandle === "source" ? Position.Bottom : Position.Top}
      />
    </div>
  );
};
