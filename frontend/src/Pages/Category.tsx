import React from "react";
import { useParams } from "react-router-dom";
import { useSearchByCategory } from "../Api/useSearchByCategory";
import NewsCategorySkeleton from "../components/NewCategorySkeleton";
import ImageWithFallback from "../components/ImageWithFallBack";
import { INews } from "../types";

const Category: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const { newsByCategory, isLoading } = useSearchByCategory({
    category: category || "",
  });

  return (
    <div className="flex flex-wrap items-center justify-between max-w-screen-xl min-h-screen px-4 mx-auto">
      {isLoading && <NewsCategorySkeleton />}
      {!isLoading && (
        <section className="flex flex-wrap items-center justify-center max-w-screen-xl px-4 pt-3 mx-auto">
          <h1 className="px-5 pb-3 text-4xl text-center font-heading dark:text-white">
            {category}
          </h1>
          {newsByCategory && (
            <div className="grid border-black dark:border-white gap-y-4 md:grid-cols-2 lg:grid-cols-3 border-x">
              {Object.keys(newsByCategory).map(
                (key) =>
                  key &&
                  newsByCategory[key].map((item: INews) => (
                    <div
                      className="grid-cols-1 p-5 border-black dark:border-white border-y"
                      key={item.id}
                    >
                      <ImageWithFallback
                        src={item.images.url}
                        alt={item.title}
                        className=""
                      />
                      <h4 className="text-sm font-bold font-body dark:text-white">
                        {item.title?.slice(0, 100)}
                        <a
                          href={item.url}
                          target="_blank"
                          className="inline-block ml-2 text-xs text-red-1x"
                        >
                          Read More
                        </a>
                      </h4>
                    </div>
                  ))
              )}
            </div>
          )}
          {!isLoading && newsByCategory?.length < 1 && (
            <div className="flex justify-center w-full h-full">
              <h5 className="mt-20 text-xl font-bold">No news found!!!</h5>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Category;
