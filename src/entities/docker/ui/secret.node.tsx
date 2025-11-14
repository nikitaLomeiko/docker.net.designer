import React from "react";
import { SecretConfig } from "../model";
import { FolderIcon } from "./icons/folder.icon";
import { LockIcon } from "./icons/lock.icon";
import { ExternalLinkIcon } from "./icons/external.link.icon";
import { CodeIcon } from "./icons/code.icon";
import { EnvironmentIcon } from "./icons/enviroment.icon";
import { NodePropsType } from "../model/types/node.type";
import { PropertyListDisplay } from "./components/property.list.display";
import { TagIcon } from "./icons/tag.icon";
import { PropertyDisplay } from "./components/property.display";
import { NodeWrapper } from "./components/node.wrapper";
import { NodeLayout } from "./components/node.layout";
import { ExternalInfo } from "./components/external.info";
import { ContentWarning } from "./components/content.warning";

interface IProps {
  data: SecretConfig;
  node: NodePropsType;
}

export type SecretNodeName = "secret";

export const SecretNode: React.FC<IProps> = ({ data, node }) => {
  const renderSecretSource = () => {
    if (data.file) {
      return <PropertyDisplay icon={<FolderIcon />} label="File Source" value={data.file} />;
    }

    if (data.content) {
      return <PropertyDisplay icon={<CodeIcon />} label="Direct Content" value={data.content} />;
    }

    if (data.environment) {
      return <PropertyDisplay icon={<EnvironmentIcon />} label="Environment Variable" value={data.environment} />;
    }

    return (
      <div className="flex items-center justify-center py-8 text-gray-400">
        <LockIcon />
        <span className="ml-2">No source specified</span>
      </div>
    );
  };

  return (
    <NodeWrapper onDelete={node.onDelete} id={node.id} data={data} form={node.changeForm} typeHandle="target">
      <NodeLayout
        icon={<LockIcon />}
        color="white"
        id={node.id}
        label="Docker Secret"
        name={data.name || "Unnamed Network"}
        nameFooter="Secret Ready"
      >
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <h4 className="flex items-center text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              <LockIcon />
              <span className="ml-2">Basic Information</span>
            </h4>

            <div className="space-y-3">
              <PropertyDisplay icon={<LockIcon />} label="Secret Name" value={data.name || "Not specified"} />

              <PropertyDisplay icon={<ExternalLinkIcon />} label="Secret Type">
                <ExternalInfo external={data.external} />
              </PropertyDisplay>
            </div>
          </div>

          <PropertyListDisplay icon={<TagIcon />} label="Labels" property={data.labels} />
        </div>

        <h4 className="flex items-center text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          <FolderIcon />
          <span className="ml-2">Secret Source</span>
        </h4>
        {renderSecretSource()}
        {data.content && data.content.length > 1024 && <ContentWarning content={data.content} />}
      </NodeLayout>
    </NodeWrapper>
  );
};
