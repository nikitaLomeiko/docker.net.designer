import { ErrorIcon } from "./icons/error.icon";

interface IProps {
  title: string;
}

export const ErrorMessage: React.FC<IProps> = ({ title }) => {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center">
        <ErrorIcon />
        <span className="text-red-700 text-sm">{title}</span>
      </div>
    </div>
  );
};
