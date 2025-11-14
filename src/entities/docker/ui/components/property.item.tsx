interface IProps {
  item: string;
  index: number;
}

export const PropertyItem: React.FC<IProps> = ({ item, index }) => {
  return (
    <span
      key={index}
      className="px-3 py-1.5 bg-orange-100 text-orange-800 text-sm rounded-lg border border-orange-200 font-medium shadow-sm"
    >
      {item}
    </span>
  );
};
