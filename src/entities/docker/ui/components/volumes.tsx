import { FolderIcon } from "../icons/folder.icon";
import { VolumeIcon } from "../icons/volume.icon";

interface IProps {
  volumes?: string[];
}

export const Volumes: React.FC<IProps> = ({ volumes = [] }) => {
  if (volumes.length === 0) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <VolumeIcon />
        <span className="text-sm font-semibold text-gray-700">Volumes</span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{volumes.length}</span>
      </div>
      <div className="space-y-3 bg-amber-50 rounded-lg p-4 border border-amber-200">
        {volumes.map((volume, index) => {
          let source = "";
          let target = "";
          let mode = "";

          if (typeof volume === "string") {
            const parts = volume.split(":");
            source = parts[0] || "";
            target = parts[1] || "";
            mode = parts[2] || "";
          }

          return (
            <div key={index} className="group">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-amber-100 hover:border-amber-300 transition-all duration-200 hover:shadow-sm">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center shadow-sm">
                    <FolderIcon />
                  </div>
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded border border-amber-200 font-mono break-all">
                      {source}
                    </span>
                    <svg
                      className="w-3 h-3 text-amber-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span className="text-xs font-medium text-amber-800 bg-white px-2 py-1 rounded border border-amber-300 font-mono break-all">
                      {target}
                    </span>
                  </div>

                  {mode && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-amber-600 font-medium">Mode:</span>
                      <span className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200 font-mono">
                        {mode}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">Type:</span>
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        source.startsWith("/") || source.startsWith("./")
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "bg-green-100 text-green-700 border border-green-200"
                      }`}
                    >
                      {source.startsWith("/") || source.startsWith("./") ? "Bind Mount" : "Named Volume"}
                    </span>
                  </div>
                </div>
              </div>

              {index < (volumes || []).length - 1 && (
                <div className="my-2 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
