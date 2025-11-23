interface IProps {
  icon: React.ReactNode;
  color: string;
  color_secondary: string;
  title: string;
  label: string;
  sublabel: string;
}

export const CapabilityCard: React.FC<IProps> = (props) => {
  const { color, label, title, icon, sublabel, color_secondary } = props;

  return (
    <div
      className={`bg-gradient-to-br from-${color}-50 to-${color_secondary}-100 rounded-2xl p-6 border border-${color}-200`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 bg-${color}-500 rounded-lg`}>{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-4">{label}</p>
      <div className={`text-xs text-${color}-600 font-medium`}>{sublabel}</div>
    </div>
  );
};
