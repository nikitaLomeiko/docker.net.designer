import { EnvironmentIcon } from "../icons/enviroment.icon";

interface IProps {
  environment?: Record<string, string> | string[];
}

export const Environment: React.FC<IProps> = ({ environment }) => {
  const envVars = Array.isArray(environment)
    ? environment
    : Object.entries(environment || []).map(([key, value]) => `${key}=${value}`);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <EnvironmentIcon />
        <span className="text-sm font-semibold text-gray-700">Environment Variables</span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{envVars.length}</span>
      </div>
      <div className="max-h-40 overflow-y-auto space-y-2 bg-purple-50 rounded-lg p-3 border border-purple-200">
        {envVars.map((env, index) => (
          <div key={index} className="group">
            <div className="flex items-start gap-2 p-2 rounded hover:bg-white transition-colors">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
              <span className="text-xs text-gray-700 font-mono break-all leading-relaxed">{env}</span>
            </div>
            {index < envVars.length - 1 && (
              <div className="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
