interface IProps {
  icon: React.ReactNode;
  label: string;
  property?: Record<string, unknown>;
}

export const PropertyListDisplay: React.FC<IProps> = ({ property, icon, label }) => {
  if (!property || Object.keys(property).length === 0) return null;

  const propertyOpts = Object.entries(property);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{propertyOpts.length}</span>
      </div>
      <div className="max-h-40 overflow-y-auto space-y-2 bg-orange-50 rounded-lg p-3 border border-orange-200">
        {propertyOpts.map(([key, value], index) => (
          <div key={key} className="group">
            <div className="flex items-start gap-2 p-2 rounded hover:bg-white transition-colors">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <span className="text-xs text-gray-700 font-mono break-all">
                  {key} = {value as string}
                </span>
              </div>
            </div>
            {index < propertyOpts.length - 1 && (
              <div className="h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
