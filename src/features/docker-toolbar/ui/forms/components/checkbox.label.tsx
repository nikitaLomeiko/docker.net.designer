interface IProps {
  checked: boolean;
  boxType?: "checkbox" | "radio";
  onChange: (value: boolean) => void;
  label: string;
  subLabel?: string;
  name?: string;
}

export const CheckboxLabel: React.FC<IProps> = ({ checked, label, onChange, subLabel, boxType = "checkbox", name }) => {
  return (
    <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors cursor-pointer">
      <input
        name={name}
        type={boxType}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mr-3 w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <div>
        <div className="font-medium text-gray-900">{label}</div>
        {subLabel && <div className="text-sm text-gray-500">{subLabel}</div>}
      </div>
    </label>
  );
};
