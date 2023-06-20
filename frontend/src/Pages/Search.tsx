import React from "react";
import { useParams } from "react-router-dom";
import { useSearch } from "../Api/useSearch";
import NewsCategory from "../components/NewsCategory";
import Loader from "../components/icons/Loader";
import NewsCategorySkeleton from "../components/NewCategorySkeleton";

const Search: React.FC = () => {
  const { title } = useParams();
  const { news, isLoading } = useSearch({ query: title || "" });

  return (
    <div className="flex flex-wrap items-center justify-between max-w-screen-xl min-h-screen px-4 mx-auto">
      {isLoading && (
        <div className="flex justify-center w-full h-full mt-20">
          <Loader fill={"#FC0000"} />
        </div>
      )}
      {isLoading && <NewsCategorySkeleton />}
      {news &&
        Object.keys(news).map(
          (key) =>
            key && <NewsCategory news={news[key]} title={key} key={key} />
        )}

      {!isLoading && news?.length < 1 && (
        <div className="flex justify-center w-full h-full">
          <h5 className="mt-20 text-xl font-bold">No news found!!!</h5>
        </div>
      )}
    </div>
  );
};

export default Search;
