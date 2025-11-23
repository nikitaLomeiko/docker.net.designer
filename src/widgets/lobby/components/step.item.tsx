interface IProps {
  count: number;
  title: string;
  label: string;
}

export const StepItem: React.FC<IProps> = (props) => {
  const { count, label, title } = props;

  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
        {count}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{label}</p>
      </div>
    </div>
  );
};
