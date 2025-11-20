import React, { useEffect } from "react";
import { FormWrapper } from "./components/form.wrapper";
import { downloadFormSections } from "../../model/config/form.config";
import { TextareaLabel } from "./components/textarea.label";
import { FormSection } from "./components/form.section";
import { InputLabel } from "./components/input.label";
import { IFormProps } from "../../model/types/form.props.type";
import { convertReactFlowToDockerCompose } from "shared/utils/converting/convert.react.flow.to.docker";
import { useCurrentProject } from "entities/project";
import { useForm } from "../../model/lib/hooks/use.form";

export const DownloadForm: React.FC<Omit<IFormProps, "id" | "initialData">> = ({ onCancel }) => {
  const currentProject = useCurrentProject();
  const { activeSection, formData, handleChangeFormData, setActiveSection } = useForm<{
    code: string;
    filename: string;
  }>({ code: "", filename: "file.yaml" }, { onCancel });

  useEffect(() => {
    handleChangeFormData(
      "code",
      convertReactFlowToDockerCompose({
        edges: currentProject?.edges || [],
        nodes: currentProject?.nodes || [],
        name: currentProject?.name || "docker-compose.yaml",
      })
    );
  }, [currentProject]);

  const handleDownload = () => {
    if (!formData.code?.trim()) {
      setActiveSection("editor");
      return;
    }

    if (!formData.filename?.trim()) {
      setActiveSection("settings");
      return;
    }

    const blob = new Blob([formData.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = formData.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.code?.trim()) {
      setActiveSection("editor");
      return;
    }

    handleDownload();

    onCancel?.();
  };

  return (
    <FormWrapper
      onSelectId={setActiveSection}
      onCancel={() => onCancel?.()}
      sectionConfig={downloadFormSections}
      onSubmit={handleSubmit}
    >
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto p-8">
          {activeSection === "basic" && (
            <FormSection title="Code Editor" subtitle="Write or paste your configuration code">
              <TextareaLabel
                label="Configuration Code *"
                onChange={(value) => handleChangeFormData("code", value)}
                placeholder="Enter your configuration code here..."
                value={formData.code || ""}
              />
              <div className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                <span>💡</span> Supports YAML, JSON, or any text content
              </div>
            </FormSection>
          )}

          {activeSection === "settings" && (
            <FormSection title="Download Settings" subtitle="Configure file export options">
              <InputLabel
                label="Filename *"
                onChange={(value) => handleChangeFormData("filename", value)}
                value={formData.filename || ""}
                placeholder="docker-compose.yml"
              />
              <div className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                <span>📁</span> Choose a descriptive filename for your configuration
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">💡</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">Export Tips</h4>
                    <ul className="mt-2 text-sm text-blue-700 space-y-1">
                      <li>• Use .yml or .yaml extension for YAML files</li>
                      <li>• Use .json extension for JSON files</li>
                      <li>• Include appropriate file headers and comments</li>
                      <li>• Validate your configuration before downloading</li>
                    </ul>
                  </div>
                </div>
              </div>
            </FormSection>
          )}
        </div>
      </div>
    </FormWrapper>
  );
};
