import { ExternalLinkIcon } from "../icons/external.link.icon";
import { FolderIcon } from "../icons/folder.icon";

interface IProps {
  external?: boolean | { name?: string };
}

export const ExternalInfo: React.FC<IProps> = ({ external }) => {
  if (external === undefined || external === false) {
    return (
      <div className="flex items-center text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
        <FolderIcon />
        <span className="ml-2 font-medium">Internal Volume</span>
      </div>
    );
  }

  if (external === true) {
    return (
      <div className="flex items-center text-orange-600 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
        <ExternalLinkIcon />
        <span className="ml-2 font-medium">External Volume</span>
      </div>
    );
  }

  if (typeof external === "object" && external.name) {
    return (
      <div className="flex items-center text-purple-600 bg-purple-50 px-3 py-2 rounded-lg border border-purple-200">
        <ExternalLinkIcon />
        <div className="ml-2">
          <div className="font-medium">External Volume</div>
          <div className="text-sm opacity-75">{external.name}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center text-orange-600 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
      <ExternalLinkIcon />
      <span className="ml-2 font-medium">External Volume</span>
    </div>
  );
};
