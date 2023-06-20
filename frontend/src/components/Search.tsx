import React from "react";
import { Search as SearchIcon } from "./icons";
import { useNavigate, useParams } from "react-router-dom";
import Filter from "./Filter";
import { useSearch } from "../Api/useSearch";

const Search: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filter, setFilter] = React.useState({});
  const { mutate } = useSearch({ query: searchQuery, ...filter });
  const navigate = useNavigate();
  const { title } = useParams();

  const isSearchPage = (): boolean => {
    return window.location.pathname.includes("/search");
  };

  if (search === "" && title && !isSearchPage()) {
    setSearch(title);
  }

  const filterHander = (filter: any) => {
    setFilter(filter);
    mutate("/v1/search?" + search, { query: searchQuery, ...filter });
  };

  const searchHandler = () => {
    if (search === "") return;
    setSearchQuery(search);
    navigate(`/search/${search}`);
  };
  return (
    <div className="flex items-center justify-between max-w-screen-xl p-4 mx-auto space-x-4">
      <div className="w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            id="default-search"
            className="shadow-sm bg-white-2x border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-200 focus:border-gray-200 focus:outline-0 block w-full p-2.5 dark:bg-white/40 dark:text-black dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-0 dark:focus:border-0 dark:shadow-sm-light pl-10 dark:placeholder:text-black"
            placeholder="Search News By title"
            value={search}
            required
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            onClick={searchHandler}
            className="text-white absolute right-2.5 top-1 bg-red-1x  focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-4 py-1.5 "
          >
            Search
          </button>
        </div>
      </div>
      {isSearchPage() && <Filter onFilter={(filter) => filterHander(filter)} />}
    </div>
  );
};

export default Search;
