import React from "react";
import ImageWithFallback from "./ImageWithFallBack";
import { INews } from "../types/news";

const NewsCategory: React.FC<{
  news: INews[];
  title: string;
}> = ({ news, title }: { news: INews[]; title: string }) => {
  return (
    <>
      <section className="w-full pt-3 border-black dark:border-white border-y border-x">
        <h1 className="px-5 pb-3 text-4xl text-center font-heading dark:text-white">
          {title}
        </h1>
        <div className="grid w-full gap-y-4 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <div
              className="relative grid-cols-1 p-5 space-y-3"
              key={item.id + item.source}
            >
              <ImageWithFallback
                src={item.images.url}
                alt={item.title}
                className="w-full max-h-[300px]"
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
              <small className="absolute bottom-0 dark:text-white">
                {item.publishedAtFormatted}
              </small>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default NewsCategory;
