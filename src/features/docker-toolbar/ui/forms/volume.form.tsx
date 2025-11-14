import React from "react";
import { IFormProps } from "../../model/types/form.props.type";
import { VolumeConfig } from "entities/docker";
import { volumeFormSections } from "features/docker-toolbar/model/config/form.config";
import { FormWrapper } from "./components/form.wrapper";
import { FormSection } from "./components/form.section";
import { InputLabel } from "./components/input.label";
import { InputRepeater } from "./components/input.repeater";
import { CheckboxLabel } from "./components/checkbox.label";
import { useForm } from "../../model/lib/hooks/use.form";

export const VolumeForm: React.FC<IFormProps> = (props) => {
  const { onCancel, initialData, id } = props;

  const { activeSection, formData, handleChangeFormData, handleSubmit, setActiveSection } = useForm<VolumeConfig>(
    {
      driver: "",
      driver_opts: {},
      external: false,
      labels: {},
      name: "",
      ...initialData,
    },
    { onCancel, changedId: id, isChanged: !!initialData, typeNode: "volume" }
  );

  return (
    <FormWrapper
      onSelectId={setActiveSection}
      onCancel={() => onCancel?.()}
      sectionConfig={volumeFormSections}
      onSubmit={handleSubmit}
    >
      <div className="p-8">
        {activeSection === "basic" && (
          <FormSection title="Basic Configuration" subtitle="Essential network settings">
            <div className="grid grid-cols-2 gap-6">
              <InputLabel
                label="Volume Name"
                value={formData.name || ""}
                onChange={(value) => handleChangeFormData("name", value)}
                placeholder="my-volume"
              />
              <InputLabel
                label="Driver"
                value={formData.driver || ""}
                onChange={(value) => handleChangeFormData("driver", value)}
                placeholder="local"
              />
            </div>
          </FormSection>
        )}

        {activeSection === "driver" && (
          <FormSection title="Driver Options" subtitle="Configure volume driver options">
            <div className="space-y-6">
              <InputRepeater
                initialState={Object.entries(formData.driver_opts || {})}
                label="Driver Options"
                buttonName="Add Driver Option"
                inputCount={2}
                onChange={(value) =>
                  handleChangeFormData(
                    "driver_opts",
                    Object.fromEntries(value.filter((item) => item[0] && item[1])) as Record<string, string>
                  )
                }
                placeholder={["Option name", "Option value"]}
              />
            </div>
          </FormSection>
        )}

        {activeSection === "labels" && (
          <FormSection title="Labels" subtitle="Add metadata labels to the volume">
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

        {activeSection === "external" && (
          <FormSection title="External Volume" subtitle="Configure external volume settings">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">Volume Type</label>
              <div className="space-y-4">
                <CheckboxLabel
                  boxType="radio"
                  checked={formData.external === false || formData.external === undefined}
                  onChange={(value) => handleChangeFormData("external", value)}
                  label="Internal Volume"
                  subLabel="Managed by Docker Compose"
                />
                <CheckboxLabel
                  boxType="radio"
                  checked={
                    formData.external === true || (typeof formData.external === "object" && formData.external !== null)
                  }
                  onChange={(value) => handleChangeFormData("external", value)}
                  label="External Volume"
                  subLabel="Pre-existing volume"
                />
              </div>

              {(formData.external === true ||
                (typeof formData.external === "object" && formData.external !== null)) && (
                <>
                  <InputLabel
                    value={typeof formData.external === "object" ? formData.external.name || "" : ""}
                    label="External Volume Name"
                    onChange={(value) => handleChangeFormData("external", value)}
                    placeholder="existing-volume-name"
                  />
                  <p className="mt-2 text-sm text-blue-600">Specify the name of the pre-existing volume</p>
                </>
              )}
            </div>
          </FormSection>
        )}
      </div>
    </FormWrapper>
  );
};
