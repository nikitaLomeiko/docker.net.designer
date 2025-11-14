import React from "react";
import { ServiceConfig } from "entities/docker";
import { FormWrapper } from "./components/form.wrapper";
import { serviceFormSection } from "../../model/config/form.config";
import { InputRepeater } from "./components/input.repeater";
import { InputLabel } from "./components/input.label";
import { SelectLabel } from "./components/select.label";
import { FormSection } from "./components/form.section";
import { IFormProps } from "../../model/types/form.props.type";
import { useForm } from "../../model/lib/hooks/use.form";

export const ServiceForm: React.FC<IFormProps> = (props) => {
  const { onCancel, initialData, id } = props;

  const { formData, activeSection, handleChangeFormData, handleSubmit, setActiveSection } = useForm<ServiceConfig>(
    {
      image: "",
      container_name: "",
      ports: [],
      environment: {},
      restart: "unless-stopped",
      command: "",
      entrypoint: "",
      user: "",
      working_dir: "",

      ...initialData,
    },
    { onCancel, changedId: id, isChanged: !!initialData, typeNode: "service" }
  );

  return (
    <FormWrapper
      onSelectId={setActiveSection}
      onCancel={() => onCancel?.()}
      sectionConfig={serviceFormSection}
      onSubmit={handleSubmit}
    >
      <div className="p-8">
        {activeSection === "basic" && (
          <FormSection title="Basic Configuration" subtitle="Essential service settings">
            <div className="grid grid-cols-2 gap-6">
              <InputLabel
                placeholder="nginx:alpine"
                label="Image *"
                onChange={(value) => handleChangeFormData("image", value)}
                value={formData.image || ""}
              />
              <InputLabel
                placeholder="my-container"
                label="Container Name"
                onChange={(value) => handleChangeFormData("container_name", value)}
                value={formData.container_name || ""}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <SelectLabel
                label="Restart Policy"
                onChange={(value) => handleChangeFormData("restart", value)}
                value={formData.restart || "unless-stopped"}
                options={["no", "always", "on-failure", "unless-stopped"]}
              />
              <InputLabel
                placeholder="root"
                label="User"
                onChange={(value) => handleChangeFormData("user", value)}
                value={formData.user || ""}
              />
            </div>
          </FormSection>
        )}

        {activeSection === "network" && (
          <FormSection title="Network Configuration" subtitle="Port mappings and networking">
            <InputRepeater
              initialState={(formData.ports || []).map((port) => [port])}
              label="Port Mappings"
              buttonName="Add Port Mapping"
              inputCount={1}
              onChange={(value) =>
                handleChangeFormData(
                  "ports",
                  value.map((item) => item[0])
                )
              }
              placeholder="8080:80"
            />
          </FormSection>
        )}

        {activeSection === "environment" && (
          <FormSection title="Environment Variables" subtitle="Configure service environment">
            <InputRepeater
              initialState={Object.entries(formData.environment || {})}
              label="Enviroment"
              onChange={(value) =>
                handleChangeFormData(
                  "environment",
                  Object.fromEntries(value.filter((item) => item[0] && item[1])) as Record<string, string>
                )
              }
              buttonName="Add Environment Variable"
              inputCount={2}
              placeholder={["VARIABLE_NAME", "value"]}
            />
          </FormSection>
        )}

        {activeSection === "advanced" && (
          <FormSection title="Advanced Configuration" subtitle="Additional service settings">
            <div className="grid grid-cols-2 gap-6">
              <InputLabel
                label="Command"
                onChange={(value) => handleChangeFormData("command", value)}
                placeholder="npm start"
                value={Array.isArray(formData.command) ? formData.command.join(" ") : formData.command || ""}
              />
              <InputLabel
                label="Entrypoint"
                onChange={(value) => handleChangeFormData("entrypoint", value)}
                placeholder="/bin/sh -c"
                value={Array.isArray(formData.entrypoint) ? formData.entrypoint.join(" ") : formData.entrypoint || ""}
              />
            </div>

            <InputLabel
              label="Working Directory"
              onChange={(value) => handleChangeFormData("working_dir", value)}
              placeholder="/app"
              value={formData.working_dir || ""}
            />
          </FormSection>
        )}
      </div>
    </FormWrapper>
  );
};
