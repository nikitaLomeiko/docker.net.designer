import { useEffect, useState } from "react";

interface IProps {
  label: string;
  inputCount: number;
  placeholder: string | string[];
  buttonName: string;
  viewInputType?: "row" | "col";
  onChange: (values: string[][]) => void;
  initialState?: string[][];
}

export const InputRepeater: React.FC<IProps> = (props) => {
  const { buttonName, inputCount, placeholder, onChange, initialState, label, viewInputType = "row" } = props;

  const [inputs, setInputs] = useState<string[][]>([]);

  useEffect(() => {
    if (initialState) setInputs(initialState);
  }, []);

  useEffect(() => {
    onChange(inputs);
  }, [inputs]);

  const addInputGroup = () => {
    setInputs((prev) => [...prev, Array(inputCount).fill("")]);
  };

  const removeInputGroup = (groupIndex: number) => {
    setInputs((prev) => prev.filter((_, index) => index !== groupIndex));
  };

  const handleInputChange = (groupIndex: number, inputIndex: number, value: string) => {
    setInputs((prev) =>
      prev.map((group, gIndex) =>
        gIndex === groupIndex ? group.map((input, iIndex) => (iIndex === inputIndex ? value : input)) : group
      )
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
      <div className="space-y-4">
        {inputs.map((_, input_index) => (
          <div key={input_index} className={`flex gap-3 items-center flex-${viewInputType}`}>
            {Array.from({ length: inputCount }, (_, index) => (
              <input
                type="text"
                value={inputs[input_index][index]}
                onChange={(e) => handleInputChange(input_index, index, e.target.value)}
                placeholder={Array.isArray(placeholder) ? placeholder[index] : placeholder}
                className="flex-1 px-4 py-3 border-2 w-full border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            ))}
            <button
              type="button"
              onClick={() => removeInputGroup(input_index)}
              className={`px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 ${
                viewInputType === "col" && "w-full"
              }`}
            >
              <span>🗑️</span>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addInputGroup}
          className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
        >
          <span>➕</span> {buttonName}
        </button>
      </div>
    </div>
  );
};
