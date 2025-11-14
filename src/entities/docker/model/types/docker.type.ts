// Базовые типы
export type PortMapping =
  | string
  | {
      target: number;
      published?: number;
      protocol?: "tcp" | "udp";
      mode?: "host" | "ingress";
    };

export type VolumeMapping =
  | string
  | {
      type: "volume" | "bind" | "tmpfs" | "npipe";
      source?: string;
      target: string;
      read_only?: boolean;
      bind?: {
        propagation: "rprivate" | "private" | "rshared" | "shared" | "rslave" | "slave";
      };
      volume?: {
        nocopy?: boolean;
      };
      tmpfs?: {
        size?: number | string;
      };
    };

export type NetworkMapping =
  | string
  | {
      aliases?: string[];
      ipv4_address?: string;
      ipv6_address?: string;
    };

export type HealthCheck = {
  test: string | string[];
  interval?: string;
  timeout?: string;
  retries?: number;
  start_period?: string;
  start_interval?: string;
  disable?: boolean;
};

export type BuildConfig =
  | string
  | {
      context?: string;
      dockerfile?: string;
      args?: Record<string, string>;
      labels?: Record<string, string>;
      cache_from?: string[];
      cache_to?: string[];
      target?: string;
      network?: string;
      shm_size?: number | string;
      extra_hosts?: string[];
      isolation?: string;
    };

export type DeployConfig = {
  mode?: "replicated" | "global";
  replicas?: number;
  placement?: {
    constraints?: string[];
    preferences?: Array<{
      spread: string;
    }>;
    max_replicas_per_node?: number;
  };
  resources?: {
    limits?: {
      cpus?: number | string;
      memory?: string;
      pids?: number;
    };
    reservations?: {
      cpus?: number | string;
      memory?: string;
      devices?: Array<{
        capabilities?: string[];
        count?: number | string;
        device_ids?: string[];
        driver?: string;
      }>;
    };
  };
  restart_policy?: {
    condition?: "any" | "none" | "on-failure";
    delay?: string;
    max_attempts?: number;
    window?: string;
  };
  update_config?: {
    parallelism?: number;
    delay?: string;
    failure_action?: "continue" | "pause" | "rollback";
    monitor?: string;
    max_failure_ratio?: number;
    order?: "start-first" | "stop-first";
  };
  rollback_config?: {
    parallelism?: number;
    delay?: string;
    failure_action?: "continue" | "pause";
    monitor?: string;
    max_failure_ratio?: number;
    order?: "start-first" | "stop-first";
  };
  labels?: Record<string, string>;
  endpoint_mode?: "vip" | "dnsrr";
};

export type ServiceConfig = {
  image?: string;
  container_name?: string;
  depends_on: string[];
  ports?: string[];
  volumes?: string[];
  networks?: Record<string, NetworkMapping> | string[];
  environment?: Record<string, string> | string[];
  restart?: "no" | "always" | "on-failure" | "unless-stopped";
  command?: string | string[];
  entrypoint?: string;
  user?: string;
  working_dir?: string;
  secrets?:
    | string[]
    | Array<{
        source: string;
        target?: string;
        uid?: string;
        gid?: string;
        mode?: number;
      }>;
  configs?:
    | string[]
    | Array<{
        source: string;
        target?: string;
        uid?: string;
        gid?: string;
        mode?: number;
      }>;
};

export type NetworkConfig = {
  driver?: string;
  driver_opts?: Record<string, string>;
  attachable?: boolean;
  enable_ipv6?: boolean;
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
  internal?: boolean;
  labels?: Record<string, string>;
  external?: boolean;
  name?: string;
};

export type VolumeConfig = {
  driver?: string;
  driver_opts?: Record<string, string>;
  external?: boolean | { name?: string };
  labels?: Record<string, string>;
  name?: string;
};

export type SecretConfig = {
  file?: string;
  external?: boolean | { name?: string };
  labels?: Record<string, string>;
  name?: string;
  environment?: string;
  content?: string;
};

export type ConfigConfig = {
  file?: string;
  external?: boolean | { name?: string };
  labels?: Record<string, string>;
  name?: string;
  content?: string;
};

export interface DockerComposeConfig {
  version?: string;
  name?: string;
  services: Record<string, ServiceConfig>;
  networks?: Record<string, NetworkConfig>;
  volumes?: Record<string, VolumeConfig>;
  secrets?: Record<string, SecretConfig>;
  configs?: Record<string, ConfigConfig>;
}
