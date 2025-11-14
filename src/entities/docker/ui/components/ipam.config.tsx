import { FC } from "react";
import { IpIcon } from "../icons/ip.icon";

interface IProps {
  ipam?: {
    driver?: string;
    config?: Array<{
      subnet?: string;
      ip_range?: string;
      gateway?: string;
      aux_addresses?: Record<string, string>;
    }>;
    options?: Record<string, string>;
  };
}

export const IPAMConfig: FC<IProps> = (props) => {
  if (!props.ipam?.config || props.ipam.config.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <IpIcon />
        <span className="text-sm font-semibold text-gray-700">IPAM Configuration</span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{props.ipam.config.length}</span>
      </div>
      <div className="space-y-3">
        {props.ipam.config.map((config, index) => (
          <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-200 space-y-2">
            {config.subnet && (
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600">Subnet:</span>
                  <span className="text-xs text-gray-800 font-mono bg-white px-2 py-1 rounded border border-blue-300">
                    {config.subnet}
                  </span>
                </div>
              </div>
            )}
            {config.ip_range && (
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600">IP Range:</span>
                  <span className="text-xs text-gray-800 font-mono bg-white px-2 py-1 rounded border border-blue-300">
                    {config.ip_range}
                  </span>
                </div>
              </div>
            )}
            {config.gateway && (
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600">Gateway:</span>
                  <span className="text-xs text-gray-800 font-mono bg-white px-2 py-1 rounded border border-blue-300">
                    {config.gateway}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
