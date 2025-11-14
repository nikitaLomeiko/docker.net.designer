import React from "react";
import { NetworkConfig } from "entities/docker";
import { IFormProps } from "../../model/types/form.props.type";
import { FormWrapper } from "./components/form.wrapper";
import { NetworkFormSections } from "../../model/config/form.config";
import { FormSection } from "./components/form.section";
import { InputLabel } from "./components/input.label";
import { SelectLabel } from "./components/select.label";
import { InputRepeater } from "./components/input.repeater";
import { CheckboxLabel } from "./components/checkbox.label";
import { useForm } from "../../model/lib/hooks/use.form";

export const NetworkForm: React.FC<IFormProps> = (props) => {
  const { onCancel, initialData, id } = props;

  const { activeSection, formData, handleChangeFormData, handleSubmit, setActiveSection } = useForm<NetworkConfig>(
    {
      driver: "bridge",
      attachable: false,
      enable_ipv6: false,
      internal: false,
      external: false,
      ...initialData,
    },
    { onCancel, changedId: id, isChanged: !!initialData, typeNode: "network" }
  );

  return (
    <FormWrapper
      onSelectId={setActiveSection}
      onCancel={() => onCancel?.()}
      sectionConfig={NetworkFormSections}
      onSubmit={handleSubmit}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {activeSection === "basic" && (
            <FormSection title="Basic Configuration" subtitle="Essential network settings">
              <div className="grid grid-cols-2 gap-6">
                <InputLabel
                  label="Network Name"
                  value={formData.name || ""}
                  onChange={(value) => handleChangeFormData("name", value)}
                  placeholder="my-network"
                />
                <SelectLabel
                  label="Driver"
                  value={formData.driver || ""}
                  onChange={(value) => handleChangeFormData("driver", value)}
                  options={["Bridge", "Overlay", "Host", "Macvlan", "None"]}
                />
              </div>
            </FormSection>
          )}

          {activeSection === "driver" && (
            <FormSection title="Driver Options" subtitle="Configure network driver options">
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
            <FormSection title="Labels" subtitle="Add metadata labels to the network">
              <div className="space-y-6">
                <InputRepeater
                  initialState={Object.entries(formData.labels || {})}
                  label="Network Labels"
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

          {activeSection === "ipam" && (
            <div className="space-y-6">
              <FormSection title="IPAM Configuration" subtitle="Configure IP Address Management">
                <InputLabel
                  label="IPAM Driver"
                  placeholder="default"
                  value={formData.ipam?.driver || ""}
                  onChange={(value) =>
                    handleChangeFormData("ipam", {
                      ...formData.ipam,
                      driver: value,
                    })
                  }
                />

                <InputRepeater
                  initialState={
                    formData.ipam?.config?.map((config) => [
                      config.subnet || "",
                      config.ip_range || "",
                      config.gateway || "",
                    ]) || []
                  }
                  label="IPAM Configurations"
                  buttonName="Add IPAM Config"
                  viewInputType="col"
                  inputCount={3}
                  onChange={(value) => {
                    const ipamConfig = value
                      .map((item) => ({
                        subnet: item[0] || undefined,
                        ip_range: item[1] || undefined,
                        gateway: item[2] || undefined,
                      }))
                      .filter((config) => config.subnet || config.ip_range || config.gateway);

                    handleChangeFormData("ipam", {
                      ...formData.ipam,
                      config: ipamConfig.length > 0 ? ipamConfig : undefined,
                    });
                  }}
                  placeholder={[
                    "Subnet (e.g., 172.20.0.0/16)",
                    "IP Range (e.g., 172.20.10.0/24)",
                    "Gateway (e.g., 172.20.10.1)",
                  ]}
                />

                <InputRepeater
                  initialState={Object.entries(formData.ipam?.options || {})}
                  label="IPAM Options"
                  buttonName="Add IPAM Option"
                  inputCount={2}
                  onChange={(value) =>
                    handleChangeFormData("ipam", {
                      ...formData.ipam,
                      options: Object.fromEntries(value.filter((item) => item[0] && item[1])) as Record<string, string>,
                    })
                  }
                  placeholder={["Option name", "Option value"]}
                />
              </FormSection>
            </div>
          )}

          {activeSection === "options" && (
            <FormSection title="Network Options" subtitle="Configure additional network settings">
              <div className="grid grid-cols-1 gap-4">
                <CheckboxLabel
                  checked={formData.attachable || false}
                  onChange={(value) => handleChangeFormData("attachable", value)}
                  label="Attachable"
                  subLabel="Allow standalone containers to attach to this network"
                />
                <CheckboxLabel
                  checked={formData.enable_ipv6 || false}
                  onChange={(value) => handleChangeFormData("enable_ipv6", value)}
                  label="Enable IPv6"
                  subLabel="Enable IPv6 networking on this network"
                />
                <CheckboxLabel
                  checked={formData.internal || false}
                  onChange={(value) => handleChangeFormData("internal", value)}
                  label="Internal"
                  subLabel="Restrict external access to the network"
                />
                <CheckboxLabel
                  checked={formData.external || false}
                  onChange={(value) => handleChangeFormData("external", value)}
                  label="External"
                  subLabel="Use an externally created network"
                />
              </div>
            </FormSection>
          )}
        </div>
      </div>
    </FormWrapper>
  );
};
