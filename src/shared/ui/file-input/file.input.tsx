import React, { useCallback, useState } from "react";
import { DownloadIcon } from "./components/icons/download.icon";
import { ErrorMessage } from "./components/error.message";
import { SuccessfulyMessage } from "./components/successfuly.message";

interface FileInputProps {
  onFileSelected?: (file: File) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number;
}

export const FileInput: React.FC<FileInputProps> = ({
  onFileSelected,
  acceptedFileTypes = "*",
  maxFileSize = 10 * 1024 * 1024,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const validateFile = useCallback(
    (file: File): boolean => {
      setError(null);

      if (file.size > maxFileSize) {
        setError(`Файл слишком большой. Максимальный размер: ${Math.round(maxFileSize / 1024 / 1024)}MB`);
        return false;
      }

      if (acceptedFileTypes !== "*") {
        const acceptedTypes = acceptedFileTypes.split(",").map((type) => type.trim());
        const fileExtension = "." + file.name.toLowerCase().split(".").pop();

        if (!acceptedTypes.some((type) => type.endsWith(fileExtension) || type === file.type)) {
          setError(`Неподдерживаемый тип файла. Разрешенные: ${acceptedFileTypes}`);
          return false;
        }
      }

      return true;
    },
    [acceptedFileTypes, maxFileSize]
  );

  const processFile = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        setSelectedFile(file);
        setError(null);
        onFileSelected?.(file);
      }
    },
    [validateFile, onFileSelected]
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}
          ${error ? "border-red-300 bg-red-50" : ""}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input id="file-input" type="file" accept={acceptedFileTypes} onChange={handleFileSelect} className="hidden" />

        <div className="space-y-3">
          <div className="text-gray-400">
            <DownloadIcon />
          </div>

          <div>
            <p className="text-lg font-medium text-gray-900">{selectedFile ? "Файл выбран" : "Выберите файл"}</p>
            <p className="text-sm text-gray-500 mt-1">Перетащите файл сюда или нажмите для выбора</p>
            {acceptedFileTypes !== "*" && (
              <p className="text-xs text-gray-400 mt-2">Поддерживаемые форматы: {acceptedFileTypes}</p>
            )}
          </div>
        </div>
      </div>

      {error && <ErrorMessage title={error} />}
    </div>
  );
};
