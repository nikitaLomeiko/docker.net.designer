import { useEffect, useState } from "react";
import { NetworkConfig } from "../model";
import { SettingsIcon } from "./icons/settings.icon";
import { TagIcon } from "./icons/tag.icon";
import { IpIcon } from "./icons/ip.icon";
import { NodeWrapper } from "./components/node.wrapper";
import { NetworkIcon } from "./icons/network.icon";
import { FlagIcon } from "./icons/flag.icon";
import { PropertyListDisplay } from "./components/property.list.display";
import { IPAMConfig } from "./components/ipam.config";
import { PropertyDisplay } from "./components/property.display";
import { PropertyItem } from "./components/property.item";
import { NodePropsType } from "../model/types/node.type";
import { NodeLayout } from "./components/node.layout";

interface IProps {
  data: NetworkConfig;
  node: NodePropsType;
}

export type NetworkNodeName = "network";

export const NetworkNode: React.FC<IProps> = ({ data, node }) => {
  const [flags, setFlags] = useState<string[]>([]);

  useEffect(() => {
    const flags = [];
    if (data.attachable) flags.push("Attachable");
    if (data.enable_ipv6) flags.push("IPv6 Enabled");
    if (data.internal) flags.push("Internal");
    if (data.external) flags.push("External");

    setFlags(flags);
  }, []);

  return (
    <NodeWrapper onDelete={node.onDelete} id={node.id} data={data} form={node.changeForm} typeHandle="target">
      <NodeLayout
        color="red"
        icon={<NetworkIcon />}
        id={node.id}
        label="Docker Network"
        name={data.name || "Unnamed Network"}
        nameFooter="Network Ready"
      >
        {data.driver && <PropertyDisplay color="green" icon={<SettingsIcon />} label="Driver" value={data.driver} />}

        {data.ipam?.driver && <PropertyDisplay icon={<IpIcon />} label="IPAM Driver" value={data.ipam.driver} />}

        <PropertyListDisplay icon={<SettingsIcon />} label="Driver Options" property={data.driver_opts} />

        <PropertyListDisplay icon={<TagIcon />} label="Labels" property={data.labels} />

        <IPAMConfig ipam={data.ipam} />

        <PropertyListDisplay icon={<SettingsIcon />} label="IPAM Options" property={data.ipam?.options} />

        <PropertyDisplay icon={<FlagIcon />} label="Network Flags">
          {flags.map((flag, index) => (
            <PropertyItem index={index} item={flag} />
          ))}
        </PropertyDisplay>
      </NodeLayout>
    </NodeWrapper>
  );
};
