interface IProps {
  icon: React.ReactNode;
  name: string;
  label: string;
  id: string;
  nameFooter: string;
  children: React.ReactNode;
}

export const NodeLayout: React.FC<IProps> = (props) => {
  const { icon, id, label, name, nameFooter, children } = props;
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 p-6 min-w-80 max-w-md backdrop-blur-sm">
      {/* Заголовок */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-sm">{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 truncate text-lg">{name}</h3>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>

      <div className="space-y-4">{children}</div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">{nameFooter}</span>
        </div>
        <div className="text-xs text-gray-400">ID: {id.slice(0, 8)}...</div>
      </div>
    </div>
  );
};
