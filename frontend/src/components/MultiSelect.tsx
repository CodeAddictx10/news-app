import Select from "react-select";
import { ISourceCategory } from "../types";

const customStyles = {
  option: (_: unknown, state: any) => ({
    backgroundColor: state.isSelected ? "#FFFDF6" : "#FFFDF9",
    color: state.isSelected ? "black" : "inherit",
    cursor: "pointer",
    padding: 10,
    "&:hover": {
      backgroundColor: "red",
      color: "white",
    },
  }),
};
const MultiSelect = ({
  data,
  onSelect,
}: {
  data: ISourceCategory[];
  onSelect: (e: any) => void;
}) => {
  const updatedData =
    data &&
    data.map((item: ISourceCategory) => {
      return {
        id: item.id,
        value: item.id,
        label: item.name,
      };
    });
  return (
    <Select
      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm basic-single bg-gray-50 focus:ring-gray-200 focus:border-gray-200 focus:outline-gray-200  px-2.5 dark:bg-white dark:border-black dark:placeholder-gray-400 dark:text-black dark:focus:ring-0 dark:focus:border-0"
      classNamePrefix="select "
      isLoading={!data}
      isSearchable={true}
      name="color"
      onChange={(e: any) => onSelect(e)}
      options={updatedData}
      unstyled={true}
      styles={customStyles}
    />
  );
};

export default MultiSelect;
