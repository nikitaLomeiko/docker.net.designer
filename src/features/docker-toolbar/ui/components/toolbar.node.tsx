import { IToolbar } from "features/docker-toolbar/model/types/toolbar.type";
import React, { useState } from "react";
import { Modal } from "shared/ui/modal";
import { Portal } from "shared/ui/portal";

interface IProps extends IToolbar {
  toolsCount: number;
}

export const ToolbarNode: React.FC<IProps> = (props) => {
  const { color, icon, id, label, toolsCount, form: FormComponent } = props;

  const [isSelect, setSelect] = useState(false);
  const [isShow, setShow] = useState(false);

  return (
    <div key={id} className="relative">
      <button
        onClick={() => setShow(true)}
        onMouseEnter={() => setSelect(true)}
        onMouseLeave={() => setSelect(false)}
        className={`
                    p-3 rounded-xl transition-all duration-300 group relative
                    ${
                      isSelect
                        ? `bg-gradient-to-r ${color} text-white shadow-lg transform scale-110`
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                    }
                  `}
        title={label}
      >
        {icon}

        <div
          className={`
                    absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3
                    px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg
                    whitespace-nowrap pointer-events-none
                    transition-all duration-200 ease-out shadow-lg
                    ${isSelect ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"}
                  `}
        >
          {label}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>

        {isSelect && <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse" />}
      </button>

      {id !== toolsCount && (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-6 bg-gray-200/60" />
      )}

      <Portal>
        <Modal size="lg" isOpen={isShow} onClose={() => setShow(false)}>
          <FormComponent onCancel={() => setShow(false)} />
        </Modal>
      </Portal>
    </div>
  );
};
