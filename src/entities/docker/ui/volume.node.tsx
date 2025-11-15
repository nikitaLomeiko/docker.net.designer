import React from "react";
import { DatabaseIcon } from "./icons/database.icon";
import { HardDriveIcon } from "./icons/hard.drive.icon";
import { SettingsIcon } from "./icons/settings.icon";
import { TagIcon } from "./icons/tag.icon";
import { VolumeConfig } from "../model";
import { PropertyListDisplay } from "./components/property.list.display";
import { NodePropsType } from "../model/types/node.type";
import { NodeWrapper } from "./components/node.wrapper";
import { NodeLayout } from "./components/node.layout";
import { PropertyDisplay } from "./components/property.display";
import { ExternalInfo } from "./components/external.info";
import { VolumeIcon } from "./icons/volume.icon";

interface IProps {
  data: VolumeConfig;
  node: NodePropsType;
}

export type VolumeNodeName = "volume";

export const VolumeNode: React.FC<IProps> = ({ data, node }) => {
  return (
    <NodeWrapper onDelete={node.onDelete} id={node.id} data={data} form={node.changeForm} typeHandle="target">
      <NodeLayout
        icon={<DatabaseIcon />}
        color="green"
        id={node.id}
        label="Docker Volume"
        nameFooter="Volume Configured"
        name={data.name || "Unnamed Volume"}
      >
        <PropertyDisplay
          icon={<HardDriveIcon />}
          label="Driver"
          value={data.driver ? data.driver : "Default (local)"}
        />

        <PropertyDisplay color="red" icon={<VolumeIcon />} label=" Volume Type">
          <ExternalInfo external={data.external} />
        </PropertyDisplay>

        <PropertyListDisplay icon={<SettingsIcon />} label="Driver Options" property={data.driver_opts} />

        <PropertyListDisplay icon={<TagIcon />} label="Labels" property={data.labels} />
      </NodeLayout>
    </NodeWrapper>
  );
};
