import { useState } from "react";
import { IFormSection } from "../../../model/types/form.section.type";
import { SectionNode } from "./ui/section.node";

interface IProps {
  children: React.ReactNode;
  sectionConfig: IFormSection[];
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEdit?: boolean;
  onSelectId: (id: string) => void;
}

export const FormWrapper: React.FC<IProps> = (props) => {
  const { children, onSubmit, sectionConfig, onCancel, isEdit = false, onSelectId } = props;

  const [selectId, setSelectId] = useState("basic");

  const handleSelectId = (id: string) => {
    setSelectId(id);
    onSelectId(id);
  };

  return (
    <form onSubmit={onSubmit} className="flex bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="w-64 bg-gradient-to-b from-blue-50 to-gray-50 border-r border-gray-200 p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🐳</span>
            </div>
          </h2>
          <p className="text-sm text-gray-500 mt-1">Configure your Docker service</p>
        </div>

        <nav className="space-y-2">
          {sectionConfig.map((section) => (
            <SectionNode {...section} onSelect={() => handleSelectId(section.id)} selectId={selectId} />
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto">
        {children}

        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex gap-3 justify-end">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
