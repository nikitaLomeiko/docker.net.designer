import { Node, Edge } from "@xyflow/react";
import {
  DockerComposeConfig,
  ServiceConfig,
  NetworkConfig,
  VolumeConfig,
  SecretConfig,
  ConfigConfig,
  IpamType,
} from "entities/docker";
import yaml from "js-yaml";

interface ReactFlowToDockerComposeParams {
  nodes: Node[];
  edges: Edge[];
  name?: string;
}

const getString = (value: unknown): string | undefined => {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
};

const getStringArray = (value: unknown): string[] | undefined => {
  if (Array.isArray(value)) {
    const filtered = value.filter((item) => typeof item === "string" && item.trim() !== "");
    return filtered.length > 0 ? filtered : undefined;
  }
  return undefined;
};

const getRecord = (value: unknown): Record<string, string> | undefined => {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const entries = Object.entries(value).filter(
      ([key, val]) => typeof key === "string" && typeof val === "string" && key.trim() !== ""
    );
    return entries.length > 0 ? Object.fromEntries(entries) : undefined;
  }
  return undefined;
};

const getRestartPolicy = (value: unknown): "no" | "always" | "on-failure" | "unless-stopped" | undefined => {
  const validPolicies = ["no", "always", "on-failure", "unless-stopped"];
  return typeof value === "string" && validPolicies.includes(value as any)
    ? (value as "no" | "always" | "on-failure" | "unless-stopped")
    : undefined;
};

const getVolumeMappings = (value: unknown): string[] | undefined => {
  if (Array.isArray(value)) {
    const filtered = value.filter((item) => typeof item === "string" && item.trim() !== "");
    return filtered.length > 0 ? filtered : undefined;
  }
  return undefined;
};

const getEnvironment = (value: unknown): Record<string, string> | string[] | undefined => {
  if (Array.isArray(value)) {
    const filtered = value.filter((item) => typeof item === "string" && item.trim() !== "");
    return filtered.length > 0 ? filtered : undefined;
  }

  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const entries = Object.entries(value).filter(
      ([key, val]) => typeof key === "string" && typeof val === "string" && key.trim() !== ""
    );
    return entries.length > 0 ? Object.fromEntries(entries) : undefined;
  }

  return undefined;
};

const cleanConfigObject = <T extends object>(obj: T): Partial<T> => {
  const cleaned = Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "object") return Object.keys(value).length > 0;
      if (typeof value === "string") return value.trim() !== "";
      return true;
    })
  );
  return Object.keys(cleaned).length > 0 ? (cleaned as Partial<T>) : {};
};

const extractVolumeNamesFromMappings = (volumeMappings: string[]): string[] => {
  const volumeNames = new Set<string>();

  volumeMappings.forEach((mapping) => {
    if (typeof mapping === "string") {
      const parts = mapping.split(":");
      const source = parts[0];

      if (source && !source.startsWith("/") && !source.startsWith("./")) {
        volumeNames.add(source);
      }
    }
  });

  return Array.from(volumeNames);
};

export const convertReactFlowToDockerCompose = ({ nodes, edges, name }: ReactFlowToDockerComposeParams): string => {
  const composeConfig: DockerComposeConfig = {
    services: {},
  };

  const networks: Record<string, NetworkConfig> = {};
  const volumes: Record<string, VolumeConfig> = {};
  const secrets: Record<string, SecretConfig> = {};
  const configs: Record<string, ConfigConfig> = {};

  if (name) {
    composeConfig.name = name;
  }

  const serviceNodes = nodes.filter((node) => node.type === "service");
  const networkNodes = nodes.filter((node) => node.type === "network");
  const volumeNodes = nodes.filter((node) => node.type === "volume");
  const secretNodes = nodes.filter((node) => node.type === "secret");
  const configNodes = nodes.filter((node) => node.type === "config");

  const volumeNamesFromServices = new Set<string>();

  const volumeNodesMap = new Map<string, Node>();
  volumeNodes.forEach((volumeNode) => {
    const volumeName = getString(volumeNode.data.name) || getString(volumeNode.data.label);
    if (volumeName) {
      volumeNodesMap.set(volumeName, volumeNode);
    }
  });

  serviceNodes.forEach((serviceNode) => {
    const serviceName = getString(serviceNode.data.label) || getString(serviceNode.data.container_name);
    if (!serviceName) return;

    const serviceConfig: ServiceConfig = {
      image: getString(serviceNode.data.image),
      container_name: getString(serviceNode.data.container_name),
      ports: getStringArray(serviceNode.data.ports),
      environment: getEnvironment(serviceNode.data.environment),
      restart: getRestartPolicy(serviceNode.data.restart),
      command: getStringArray(serviceNode.data.command) || getString(serviceNode.data.command),
      entrypoint: getStringArray(serviceNode.data.entrypoint) || getString(serviceNode.data.entrypoint),
      user: getString(serviceNode.data.user),
      working_dir: getString(serviceNode.data.working_dir),
      depends_on: getStringArray(serviceNode.data.depends_on),
    };

    const volumesFromServiceData = getVolumeMappings(serviceNode.data.volumes);
    if (volumesFromServiceData) {
      serviceConfig.volumes = volumesFromServiceData;

      const volumeNames = extractVolumeNamesFromMappings(volumesFromServiceData);
      volumeNames.forEach((name) => volumeNamesFromServices.add(name));
    } else {
      const volumeEdges = edges.filter(
        (edge) => edge.source === serviceNode.id && volumeNodes.some((volNode) => volNode.id === edge.target)
      );

      if (volumeEdges.length > 0) {
        const volumeMappings = volumeEdges
          .map((edge) => {
            const volumeNode = volumeNodes.find((volNode) => volNode.id === edge.target);
            const volumeName = getString(volumeNode?.data.name);

            if (!volumeName) return null;

            const mountPath = getString(volumeNode?.data.mountPath) || getString(volumeNode?.data.target) || "/data";

            return `${volumeName}:${mountPath}`;
          })
          .filter((mapping): mapping is string => !!mapping);

        if (volumeMappings.length > 0) {
          serviceConfig.volumes = volumeMappings;

          // Добавляем имена volumes из edges
          volumeMappings.forEach((mapping) => {
            const volumeName = mapping.split(":")[0];
            if (volumeName) {
              volumeNamesFromServices.add(volumeName);
            }
          });
        }
      }
    }

    const networksFromServiceData = getStringArray(serviceNode.data.networks);
    if (networksFromServiceData) {
      serviceConfig.networks = networksFromServiceData;
    } else {
      const networkEdges = edges.filter(
        (edge) => edge.source === serviceNode.id && networkNodes.some((netNode) => netNode.id === edge.target)
      );

      if (networkEdges.length > 0) {
        const networkNames = networkEdges
          .map((edge) => {
            const networkNode = networkNodes.find((netNode) => netNode.id === edge.target);
            return getString(networkNode?.data.label) || getString(networkNode?.data.name);
          })
          .filter((name): name is string => !!name);

        if (networkNames.length > 0) {
          serviceConfig.networks = networkNames;
        }
      }
    }

    const dependsOnFromServiceData = getStringArray(serviceNode.data.depends_on);
    if (dependsOnFromServiceData) {
      serviceConfig.depends_on = dependsOnFromServiceData;
    } else {
      const serviceEdges = edges.filter(
        (edge) => edge.source === serviceNode.id && serviceNodes.some((svcNode) => svcNode.id === edge.target)
      );

      if (serviceEdges.length > 0) {
        const dependencyNames = serviceEdges
          .map((edge) => {
            const targetServiceNode = serviceNodes.find((svcNode) => svcNode.id === edge.target);
            return getString(targetServiceNode?.data.label) || getString(targetServiceNode?.data.container_name);
          })
          .filter((name): name is string => !!name);

        if (dependencyNames.length > 0) {
          serviceConfig.depends_on = dependencyNames;
        }
      }
    }

    const secretsFromServiceData = getStringArray(serviceNode.data.secrets);
    if (secretsFromServiceData) {
      serviceConfig.secrets = secretsFromServiceData;
    } else {
      const secretEdges = edges.filter(
        (edge) => edge.source === serviceNode.id && secretNodes.some((secNode) => secNode.id === edge.target)
      );

      if (secretEdges.length > 0) {
        const secretNames = secretEdges
          .map((edge) => {
            const secretNode = secretNodes.find((secNode) => secNode.id === edge.target);
            return getString(secretNode?.data.label) || getString(secretNode?.data.name);
          })
          .filter((name): name is string => !!name);

        if (secretNames.length > 0) {
          serviceConfig.secrets = secretNames;
        }
      }
    }

    const configsFromServiceData = getStringArray(serviceNode.data.configs);
    if (configsFromServiceData) {
      serviceConfig.configs = configsFromServiceData;
    } else {
      const configEdges = edges.filter(
        (edge) => edge.source === serviceNode.id && configNodes.some((confNode) => confNode.id === edge.target)
      );

      if (configEdges.length > 0) {
        const configNames = configEdges
          .map((edge) => {
            const configNode = configNodes.find((confNode) => confNode.id === edge.target);
            return getString(configNode?.data.label) || getString(configNode?.data.name);
          })
          .filter((name): name is string => !!name);

        if (configNames.length > 0) {
          serviceConfig.configs = configNames;
        }
      }
    }

    const cleanedConfig = cleanConfigObject(serviceConfig);
    if (Object.keys(cleanedConfig).length > 0) {
      composeConfig.services[serviceName] = cleanedConfig as ServiceConfig;
    }
  });

  networkNodes.forEach((networkNode) => {
    const networkName = getString(networkNode.data.label) || getString(networkNode.data.name);
    if (!networkName) return;

    const networkConfig: NetworkConfig = {
      driver: getString(networkNode.data.driver),
      driver_opts: getRecord(networkNode.data.driver_opts),
      attachable: typeof networkNode.data.attachable === "boolean" ? networkNode.data.attachable : undefined,
      enable_ipv6: typeof networkNode.data.enable_ipv6 === "boolean" ? networkNode.data.enable_ipv6 : undefined,
      ipam: networkNode.data.ipam as IpamType,
      internal: typeof networkNode.data.internal === "boolean" ? networkNode.data.internal : undefined,
      labels: getRecord(networkNode.data.labels),
      external: networkNode.data.external as boolean,
    };

    const cleanedConfig = cleanConfigObject(networkConfig);
    if (Object.keys(cleanedConfig).length > 0) {
      networks[networkName] = cleanedConfig as NetworkConfig;
    }
  });

  volumeNodes.forEach((volumeNode) => {
    const volumeName = getString(volumeNode.data.name) || getString(volumeNode.data.label);
    if (!volumeName) return;

    const volumeConfig: VolumeConfig = {
      driver: getString(volumeNode.data.driver),
      driver_opts: getRecord(volumeNode.data.driver_opts),
      external: volumeNode.data.external as { name?: string },
      labels: getRecord(volumeNode.data.labels),
    };

    const cleanedConfig = cleanConfigObject(volumeConfig);
    if (Object.keys(cleanedConfig).length > 0) {
      volumes[volumeName] = cleanedConfig as VolumeConfig;
    } else {
      volumes[volumeName] = {};
    }
  });

  volumeNamesFromServices.forEach((volumeName) => {
    if (!volumes[volumeName]) {
      volumes[volumeName] = {};
    }
  });

  secretNodes.forEach((secretNode) => {
    const secretName = getString(secretNode.data.label) || getString(secretNode.data.name);
    if (!secretName) return;

    const secretConfig: SecretConfig = {
      file: getString(secretNode.data.file),
      external: secretNode.data.external as { name?: string },
      labels: getRecord(secretNode.data.labels),
      environment: getString(secretNode.data.environment),
      content: getString(secretNode.data.content),
    };

    const cleanedConfig = cleanConfigObject(secretConfig);
    if (Object.keys(cleanedConfig).length > 0) {
      secrets[secretName] = cleanedConfig as SecretConfig;
    }
  });

  configNodes.forEach((configNode) => {
    const configName = getString(configNode.data.name) || getString(configNode.data.label);
    if (!configName) return;

    const configConfig: ConfigConfig = {
      file: getString(configNode.data.file),
      external: configNode.data.external as { name?: string },
      labels: getRecord(configNode.data.labels),
      content: getString(configNode.data.content),
    };

    const cleanedConfig = cleanConfigObject(configConfig);
    if (Object.keys(cleanedConfig).length > 0) {
      configs[configName] = cleanedConfig as ConfigConfig;
    }
  });

  if (Object.keys(networks).length > 0) {
    composeConfig.networks = networks;
  }
  if (Object.keys(volumes).length > 0) {
    composeConfig.volumes = volumes;
  }
  if (Object.keys(secrets).length > 0) {
    composeConfig.secrets = secrets;
  }
  if (Object.keys(configs).length > 0) {
    composeConfig.configs = configs;
  }

  const yamlString = yaml.dump(composeConfig, {
    indent: 2,
    lineWidth: -1,
    noRefs: true,
    skipInvalid: true,
  });

  return yamlString;
};
