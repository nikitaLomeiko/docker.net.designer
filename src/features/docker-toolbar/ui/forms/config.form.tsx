import React, { useState } from "react";
import { IFormProps } from "../../model/types/form.props.type";
import { ConfigConfig } from "entities/docker";
import { FormWrapper } from "./components/form.wrapper";
import { configFormSections } from "../../model/config/form.config";
import { FormSection } from "./components/form.section";
import { InputLabel } from "./components/input.label";
import { CheckboxLabel } from "./components/checkbox.label";
import { InputRepeater } from "./components/input.repeater";
import { useForm } from "../../model/lib/hooks/use.form";

export const ConfigForm: React.FC<IFormProps> = (props) => {
  const { onCancel, initialData, id } = props;

  const { activeSection, formData, handleChangeFormData, handleSubmit, setActiveSection } = useForm<ConfigConfig>(
    {
      file: "",
      external: false,
      labels: {},
      name: "",
      content: "",
      ...initialData,
    },
    { onCancel, changedId: id, isChanged: !!initialData, typeNode: "config" }
  );

  const [configSource, setConfigSource] = useState<"file" | "content">(formData.file ? "file" : "content");

  const handleConfigSourceChange = (source: "file" | "content") => {
    setConfigSource(source);
    if (source === "file") {
      handleChangeFormData("content", "");
    } else {
      handleChangeFormData("file", "");
    }
  };

  return (
    <FormWrapper
      onSelectId={setActiveSection}
      onCancel={() => onCancel?.()}
      sectionConfig={configFormSections}
      onSubmit={handleSubmit}
    >
      <div className="p-8">
        {activeSection === "basic" && (
          <FormSection title="Basic Configuration" subtitle="Essential config settings">
            <div className="grid grid-cols-2 gap-6">
              <InputLabel
                label="Config Name"
                value={formData.name || ""}
                onChange={(value) => handleChangeFormData("name", value)}
                placeholder="my-config"
              />

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">External Config</label>
                <div className="space-y-4">
                  <CheckboxLabel
                    boxType="radio"
                    checked={formData.external === false || formData.external === undefined}
                    onChange={(value) => handleChangeFormData("external", value)}
                    label="Internal Config"
                    subLabel="Managed by Docker Compose"
                  />
                  <CheckboxLabel
                    boxType="radio"
                    checked={
                      formData.external === true ||
                      (typeof formData.external === "object" && formData.external !== null)
                    }
                    onChange={(value) => handleChangeFormData("external", value)}
                    label="External Config"
                    subLabel="Pre-existing Config"
                  />
                </div>

                {(formData.external === true ||
                  (typeof formData.external === "object" && formData.external !== null)) && (
                  <>
                    <InputLabel
                      value={typeof formData.external === "object" ? formData.external.name || "" : ""}
                      label="External Config Name"
                      onChange={(value) => handleChangeFormData("external", value)}
                      placeholder="existing-config-name"
                    />
                    <p className="mt-2 text-sm text-blue-600">Specify the name of the pre-existing config</p>
                  </>
                )}
              </div>
            </div>
          </FormSection>
        )}

        {activeSection === "source" && (
          <div className="space-y-6">
            <FormSection title="Config Source" subtitle="Choose how to provide config content">
              <div className="space-y-4">
                <CheckboxLabel
                  boxType="radio"
                  name="configSource"
                  checked={configSource === "file"}
                  onChange={() => handleConfigSourceChange("file")}
                  label="From File"
                  subLabel="Use an existing file"
                />

                {configSource === "file" && (
                  <div className="ml-6">
                    <input
                      type="text"
                      value={formData.file || ""}
                      onChange={(e) => handleChangeFormData("file", e.target.value)}
                      placeholder="/path/to/config/file"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all border-gray-200 focus:ring-blue-500 focus:border-blue-500`}
                    />
                  </div>
                )}

                <CheckboxLabel
                  boxType="radio"
                  name="configSource"
                  checked={configSource === "content"}
                  onChange={() => handleConfigSourceChange("content")}
                  label="Direct Content"
                  subLabel="Enter content directly"
                />

                {configSource === "content" && (
                  <div className="ml-6">
                    <textarea
                      value={formData.content || ""}
                      onChange={(e) => handleChangeFormData("content", e.target.value)}
                      placeholder="Enter config content directly..."
                      rows={8}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none border-gray-200 focus:ring-blue-500 focus:border-blue-500`}
                    />
                  </div>
                )}
              </div>
            </FormSection>
          </div>
        )}

        {activeSection === "labels" && (
          <FormSection title="Labels" subtitle="Add metadata labels to the config">
            <div className="space-y-6">
              <InputRepeater
                initialState={Object.entries(formData.labels || {})}
                label="Config Labels"
                buttonName="Add Label"
                inputCount={2}
                onChange={(value) =>
                  handleChangeFormData(
                    "labels",
                    Object.fromEntries(value.filter((item) => item[0] && item[1])) as Record<string, string>
                  )
                }
                placeholder={["Label name", "Label value"]}
              />
            </div>
          </FormSection>
        )}
      </div>
    </FormWrapper>
  );
};
