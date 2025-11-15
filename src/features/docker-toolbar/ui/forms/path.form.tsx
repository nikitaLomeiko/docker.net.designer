import React, { useState } from "react";

interface PathFormProps {
  initialData?: { path: string };
  onCancel?: () => void;
  formTitle?: string;
  placeholder?: string;
  nodeType?: string;
  onSubmit: (path: string) => void;
}

export const PathForm: React.FC<PathFormProps> = ({
  initialData,
  onCancel,
  formTitle = "Path Configuration",
  placeholder = "/path/to/file",
  onSubmit,
}) => {
  const [formData, setFormData] = useState<{ path: string }>(initialData || { path: "" });

  const handleInputChange = (value: string) => {
    setFormData({ path: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(formData.path.trim());
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{formTitle}</h3>
        <p className="text-sm text-gray-500 mt-1">Enter the path configuration</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Path *</label>
        <input
          type="text"
          value={formData.path}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500`}
        />
      </div>

      <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Path
        </button>
      </div>
    </form>
  );
};
