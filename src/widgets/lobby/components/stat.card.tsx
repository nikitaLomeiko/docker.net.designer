interface IProps {
  count?: number | string;
  label: string;
  color: string;
}

export const StatCard: React.FC<IProps> = (props) => {
  const { color, label, count } = props;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className={`text-2xl font-bold text-${color}-600 mb-1`}>{count ? count : "∞"}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};
