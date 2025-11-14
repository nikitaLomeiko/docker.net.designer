import React from "react";
import { ConfigConfig } from "../model";
import { NodePropsType } from "../model/types/node.type";
import { NodeWrapper } from "./components/node.wrapper";
import { NodeLayout } from "./components/node.layout";
import { FolderIcon } from "./icons/folder.icon";
import { ContentWarning } from "./components/content.warning";
import { SettingsIcon } from "./icons/settings.icon";
import { PropertyDisplay } from "./components/property.display";
import { ExternalLinkIcon } from "./icons/external.link.icon";
import { ExternalInfo } from "./components/external.info";
import { TagIcon } from "./icons/tag.icon";
import { PropertyListDisplay } from "./components/property.list.display";
import { CodeIcon } from "./icons/code.icon";

interface IProps {
  data: ConfigConfig;
  node: NodePropsType;
}

export type ConfigNodeName = "config";

export const ConfigNode: React.FC<IProps> = ({ data, node }) => {
  const renderConfigSource = () => {
    if (data.file) {
      return <PropertyDisplay icon={<FolderIcon />} label="File Source" value={data.file} />;
    }

    if (data.content) {
      return <PropertyDisplay icon={<CodeIcon />} label="Direct Content" value={data.content} />;
    }

    return (
      <div className="flex items-center justify-center py-8 text-gray-400">
        <FolderIcon />
        <span className="ml-2">No source specified</span>
      </div>
    );
  };

  return (
    <NodeWrapper onDelete={node.onDelete} id={node.id} data={data} form={node.changeForm} typeHandle="target">
      <NodeLayout
        icon={<SettingsIcon />}
        color="amber"
        id={node.id}
        label="Docker Config"
        name={data.name || "Unnamed Config"}
        nameFooter="Config Ready"
      >
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <h4 className="flex items-center text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              <SettingsIcon />
              <span className="ml-2">Basic Information</span>
            </h4>

            <div className="space-y-3">
              <PropertyDisplay icon={<SettingsIcon />} label="Secret Name" value={data.name || "Not specified"} />

              <PropertyDisplay icon={<ExternalLinkIcon />} label="Config Type">
                <ExternalInfo external={data.external} />
              </PropertyDisplay>
            </div>
          </div>

          <PropertyListDisplay icon={<TagIcon />} label="Labels" property={data.labels} />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h4 className="flex items-center text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            <FolderIcon />
            <span className="ml-2">Config Source</span>
          </h4>
          <div className="min-h-[200px]">{renderConfigSource()}</div>
        </div>

        {data.content && data.content.length > 1024 && <ContentWarning content={data.content} />}
      </NodeLayout>
    </NodeWrapper>
  );
};
