interface IProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  color?: string;
  children?: React.ReactNode;
}

export const PropertyDisplay: React.FC<IProps> = (props) => {
  const { icon, label, value, children, color = "blue" } = props;
  return (
    <div className={`flex items-start gap-3 group p-3 bg-${color}-50 rounded-lg border border-${color}-100`}>
      {icon}
      <div className="flex-1 min-w-0">
        <span className="text-xs font-semibold text-gray-600 block mb-1">{label}</span>
        {value && <span className="text-sm text-gray-800 font-mono break-all">{value}</span>}
        {children && <div className="flex flex-wrap gap-2">{children}</div>}
      </div>
    </div>
  );
};
