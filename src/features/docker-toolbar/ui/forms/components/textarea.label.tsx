interface IProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

export const TextareaLabel: React.FC<IProps> = (props) => {
  const { label, onChange, placeholder, value, className } = props;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div
        className={`border-2 rounded-xl overflow-hidden focus-within:ring-2 transition-all border-gray-200 focus-within:ring-green-500 focus-within:border-green-500 ${className}`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={14}
          className="w-full px-4 py-3 resize-none focus:outline-none font-mono text-sm bg-gray-50"
        />
      </div>
    </div>
  );
};
