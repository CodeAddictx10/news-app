import React from "react";
import { Filter as FilterIcon } from "./icons";
import { useSource } from "../Api/useSource";
import { useCategory } from "../Api/useCategory";
import MultiSelect from "./MultiSelect";
interface IFilterProps {
  onFilter: (filter: IFilter) => void;
}

export interface IFilter {
  from: string;
  to: string;
  category: string;
  source: string;
}
const Filter: React.FC<IFilterProps> = ({ onFilter }: IFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<IFilter>({} as IFilter);
  const { sources } = useSource();
  const { categories } = useCategory();

  const filterHandler = (e: React.FormEvent<HTMLFormElement>) => {
    setIsFilterOpen(false);
    e.preventDefault();
    onFilter(filter);
  };

  return (
    <section className="relative">
      <button
        onClick={() => {
          setIsFilterOpen(!isFilterOpen);
        }}
        title="Filter News"
      >
        <FilterIcon />
      </button>
      <form
        className={`w-[300px] z-50 border border-black bg-white-2x p-4 rounded-lg top-10 shadow-4xl absolute right-0 ${
          isFilterOpen ? "" : "hidden"
        }`}
        onSubmit={filterHandler}
      >
        <div className="mb-6">
          <label
            htmlFor="from"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
          >
            From
          </label>
          <input
            type="date"
            id="from"
            value={filter.from}
            onChange={(e) => setFilter({ ...filter, from: e.target.value })}
            className="custom-input"
            placeholder="name@flowbite.com"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="to"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
          >
            To
          </label>
          <input
            type="date"
            id="to"
            className="custom-input"
            value={filter.to}
            onChange={(e) => setFilter({ ...filter, to: e.target.value })}
            placeholder="name@flowbite.com"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
          >
            Category
          </label>
          <MultiSelect
            data={categories}
            onSelect={(item) => setFilter({ ...filter, category: item.id })}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
          >
            Source
          </label>
          <MultiSelect
            data={sources}
            onSelect={(item) => setFilter({ ...filter, source: item.id })}
          />
        </div>
        <button
          type="submit"
          className="w-full border border-black text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:bg-red-1x dark:border-0"
        >
          Filter
        </button>
      </form>
    </section>
  );
};

export default Filter;
