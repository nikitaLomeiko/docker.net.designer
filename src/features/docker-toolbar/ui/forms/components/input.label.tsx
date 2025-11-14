interface IProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

export const InputLabel: React.FC<IProps> = (props) => {
  const { label, onChange, placeholder, value, className } = props;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all border-gray-200 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      />
    </div>
  );
};
