interface IProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const FormSection: React.FC<IProps> = (props) => {
  const { children, subtitle, title } = props;
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>

      {children}
    </div>
  );
};
