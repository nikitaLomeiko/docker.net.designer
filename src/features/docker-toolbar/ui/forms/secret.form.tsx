import React, { useState } from "react";
import { IFormProps } from "../../model/types/form.props.type";
import { SecretConfig } from "entities/docker";
import { FormWrapper } from "./components/form.wrapper";
import { secretFormSections } from "../../model/config/form.config";
import { FormSection } from "./components/form.section";
import { InputLabel } from "./components/input.label";
import { CheckboxLabel } from "./components/checkbox.label";
import { InputRepeater } from "./components/input.repeater";
import { useForm } from "../../model/lib/hooks/use.form";

export const SecretForm: React.FC<IFormProps> = (props) => {
  const { onCancel, initialData, id } = props;

  const { activeSection, formData, handleChangeFormData, handleSubmit, setActiveSection } = useForm<SecretConfig>(
    {
      file: "",
      external: false,
      labels: {},
      name: "",
      environment: "",
      content: "",
      ...initialData,
    },
    { onCancel, changedId: id, isChanged: !!initialData, typeNode: "secret" }
  );

  const [secretSource, setSecretSource] = useState<"file" | "content" | "environment">(
    formData.file ? "file" : formData.content ? "content" : formData.environment ? "environment" : "file"
  );

  const handleSecretSourceChange = (source: "file" | "content" | "environment") => {
    setSecretSource(source);
    if (source === "file") {
      handleChangeFormData("content", "");
      handleChangeFormData("environment", "");
    } else if (source === "content") {
      handleChangeFormData("file", "");
      handleChangeFormData("environment", "");
    } else if (source === "environment") {
      handleChangeFormData("file", "");
      handleChangeFormData("content", "");
    }
  };

  return (
    <FormWrapper
      onSelectId={setActiveSection}
      onCancel={() => onCancel?.()}
      sectionConfig={secretFormSections}
      onSubmit={handleSubmit}
    >
      <div className="p-8">
        {activeSection === "basic" && (
          <FormSection title="Basic Configuration" subtitle="Essential network settings">
            <div className="grid grid-cols-2 gap-6">
              <InputLabel
                label="Secret Name"
                value={formData.name || ""}
                onChange={(value) => handleChangeFormData("name", value)}
                placeholder="my-secret"
              />

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">External Secret</label>
                <div className="space-y-4">
                  <CheckboxLabel
                    boxType="radio"
                    checked={formData.external === false || formData.external === undefined}
                    onChange={(value) => handleChangeFormData("external", value)}
                    label="Internal Secret"
                    subLabel="Managed by Docker Compose"
                  />
                  <CheckboxLabel
                    boxType="radio"
                    checked={
                      formData.external === true ||
                      (typeof formData.external === "object" && formData.external !== null)
                    }
                    onChange={(value) => handleChangeFormData("external", value)}
                    label="External Secret"
                    subLabel="Pre-existing secret"
                  />
                </div>

                {(formData.external === true ||
                  (typeof formData.external === "object" && formData.external !== null)) && (
                  <>
                    <InputLabel
                      value={typeof formData.external === "object" ? formData.external.name || "" : ""}
                      label="External Secret Name"
                      onChange={(value) => handleChangeFormData("external", value)}
                      placeholder="existing-secret-name"
                    />
                    <p className="mt-2 text-sm text-blue-600">Specify the name of the pre-existing secret</p>
                  </>
                )}
              </div>
            </div>
          </FormSection>
        )}

        {activeSection === "source" && (
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-900">Secret Source</h3>
              <p className="text-sm text-gray-500 mt-1">Configure where the secret comes from</p>
            </div>

            <div className="space-y-4">
              <CheckboxLabel
                name="secretSource"
                boxType="radio"
                checked={secretSource === "file"}
                onChange={() => handleSecretSourceChange("file")}
                label="From File"
                subLabel="Load secret from a file"
              />

              {secretSource === "file" && (
                <div className="ml-6">
                  <input
                    type="text"
                    value={formData.file || ""}
                    onChange={(e) => handleChangeFormData("file", e.target.value)}
                    placeholder="/path/to/secret/file"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all border-gray-200 focus:ring-purple-500 focus:border-purple-500`}
                  />
                </div>
              )}

              <CheckboxLabel
                boxType="radio"
                name="secretSource"
                checked={secretSource === "content"}
                onChange={() => handleSecretSourceChange("content")}
                label="Direct Content"
                subLabel="Enter secret content directly"
              />

              {secretSource === "content" && (
                <div className="ml-6">
                  <input
                    value={formData.content || ""}
                    onChange={(e) => handleChangeFormData("content", e.target.value)}
                    placeholder="Enter secret content directly..."
                    type="password"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all border-gray-200 focus:ring-purple-500 focus:border-purple-500`}
                  />
                </div>
              )}

              <CheckboxLabel
                boxType="radio"
                name="secretSource"
                checked={secretSource === "environment"}
                onChange={() => handleSecretSourceChange("environment")}
                label="From Environment Variable"
                subLabel="Use environment variable as source"
              />

              {secretSource === "environment" && (
                <div className="ml-6">
                  <input
                    type="text"
                    value={formData.environment || ""}
                    onChange={(e) => handleChangeFormData("environment", e.target.value)}
                    placeholder="ENV_VARIABLE_NAME"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all border-gray-200 focus:ring-purple-500 focus:border-purple-500`}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === "advanced" && (
          <FormSection title="Advanced Configuration" subtitle="Additional secret settings">
            <div className="space-y-6">
              <InputRepeater
                initialState={Object.entries(formData.labels || {})}
                label="Volume Labels"
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
