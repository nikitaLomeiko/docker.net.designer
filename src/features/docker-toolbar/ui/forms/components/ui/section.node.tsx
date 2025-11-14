import { IFormSection } from "../../../../model/types/form.section.type";

interface IProps extends IFormSection {
  selectId: string;
  onSelect: () => void;
}

export const SectionNode: React.FC<IProps> = (props) => {
  const { icon, id, name, selectId, onSelect } = props;

  return (
    <button
      key={id}
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
        selectId === id
          ? "bg-white shadow-md border border-blue-100 text-blue-600"
          : "text-gray-600 hover:bg-white/50 hover:shadow-sm"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <div>
        <div className="font-medium text-sm">{name}</div>
      </div>
    </button>
  );
};
