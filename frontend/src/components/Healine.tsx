import React from "react";
import { useTopHeadline } from "../Api/useTopHeadline";
import ImageWithFallback from "./ImageWithFallBack";
import { INews } from "../types/news";

const TopHeadline: React.FC = () => {
  const { headlines, isLoading } = useTopHeadline();

  return (
    <section className="pt-3 border-b border-black dark:border-white">
      <h1 className="px-5 pb-3 text-4xl text-center font-heading">
        <span className="text-black dark:text-white">
          News of The <span className="text-red-1x">Day</span>
        </span>
      </h1>
      {isLoading && <TopHeadlineSkeleton />}
      <div className="grid grid-cols-1 grid-rows-2 border-black dark:border-white lg:grid-cols-3 gap-y-4 border-x lg:h-[700px]">
        {headlines && headlines["GuardianNews"] && (
          <div
            className={`flex flex-col p-3 border-black dark:border-white md:grid-cols-2 border-y last:border-t-0 md:row-span-2 h-auto md:border-r md:col-span-2 space-y-3 relative`}
          >
            <ImageWithFallback
              src={headlines["GuardianNews"][0]?.images?.url}
              alt={headlines["GuardianNews"][0]?.title}
              className="w-auto lg:h-[600px]"
            />
            <h4 className="space-x-2 text-lg font-bold lg:mt-0 font-body dark:text-white">
              <span>
                {headlines["GuardianNews"][0].title &&
                  headlines["GuardianNews"][0].title.slice(0, 100)}
              </span>
              <a
                href={headlines["GuardianNews"][0].url}
                className="inline-block text-xs text-red-1x"
                target="_blank"
              >
                Read More
              </a>
            </h4>
            <span className="absolute text-xs bottom-3 right-3 text-black-1x dark:text-white">
              {headlines["GuardianNews"][0].publishedAtFormatted}
            </span>
          </div>
        )}
        {headlines &&
          headlines["NYTimes"]?.map((item: INews) => (
            <div
              className={`relative flex flex-col p-3 space-y-3 dark:border-white border-black md:grid-cols-2 border-y last:border-t-0`}
              key={item.id}
            >
              <ImageWithFallback
                src={item.images?.url}
                alt={item.title}
                className=""
              />
              <h4 className="space-x-2 text-sm font-bold text-justify lg:mt-0 font-body dark:text-white">
                <span>{item.title?.slice(0, 100)}</span>
                <a
                  href={item.url}
                  className="inline-block text-xs text-red-1x"
                  target="_blank"
                >
                  Read More
                </a>
              </h4>

              <span className="absolute text-xs bottom-3 right-3 text-black-1x dark:text-white">
                {item.publishedAtFormatted}
              </span>
            </div>
          ))}
      </div>
    </section>
  );
};

const TopHeadlineSkeleton: React.FC = () => (
  <>
    <div className="animate-pulse w-full grid grid-cols-1 grid-rows-2 border-black dark:border-white lg:grid-cols-3 gap-y-4 border-x lg:h-[700px]">
      <div
        className={`flex flex-col p-3 border-black dark:border-white md:grid-cols-2 border-y last:border-t-0 md:row-span-2 h-auto md:border-r md:col-span-2 space-y-3`}
      >
        <svg
          className="text-gray-200 w-100 h-100 dark:text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
        </svg>
        <h4 className="h-6 space-x-2 text-lg font-bold lg:mt-0 font-body"></h4>
      </div>
      {[1, 2].map((item) => (
        <div
          className={`flex flex-col p-3 space-y-3 border-black dark:border-white md:grid-cols-2 border-y last:border-t-0`}
          key={item}
        >
          <svg
            className="w-full h-full text-gray-200 dark:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
          <h4 className="h-5 space-x-2 text-sm font-bold lg:mt-0 font-body"></h4>
        </div>
      ))}
    </div>
    <span className="sr-only">Loading...</span>
  </>
);

export default TopHeadline;
