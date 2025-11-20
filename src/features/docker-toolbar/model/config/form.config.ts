import { IFormSection } from "../types/form.section.type";

export const serviceFormSection: IFormSection[] = [
  { id: "basic", name: "Basic", icon: "⚙️" },
  { id: "network", name: "Network", icon: "🌐" },
  { id: "environment", name: "Environment", icon: "🔧" },
  { id: "advanced", name: "Advanced", icon: "🚀" },
];

export const NetworkFormSections = [
  { id: "basic", name: "Basic", icon: "⚙️" },
  { id: "driver", name: "Driver", icon: "🔧" },
  { id: "labels", name: "Labels", icon: "🏷️" },
  { id: "ipam", name: "IPAM", icon: "🌐" },
  { id: "options", name: "Options", icon: "⚡" },
];

export const volumeFormSections = [
  { id: "basic", name: "Basic", icon: "⚙️" },
  { id: "options", name: "Options", icon: "🔧" },
  { id: "labels", name: "Labels", icon: "🏷️" },
  { id: "external", name: "External", icon: "🔗" },
];

export const secretFormSections = [
  { id: "basic", name: "Basic", icon: "🔐" },
  { id: "source", name: "Source", icon: "📁" },
  { id: "advanced", name: "Advanced", icon: "⚙️" },
];

export const configFormSections = [
  { id: "basic", name: "Basic", icon: "⚙️" },
  { id: "source", name: "Config Source", icon: "📄" },
  { id: "labels", name: "Labels", icon: "🏷️" },
];

export const downloadFormSections = [
  { id: "basic", name: "Editor", icon: "📝" },
  { id: "settings", name: "Settings", icon: "⚙️" },
];
