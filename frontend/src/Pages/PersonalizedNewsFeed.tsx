import React from "react";
import { useUser } from "../Api/useUser";
import { useNavigate } from "react-router-dom";
import { useNewsFeed } from "../Api/useNewsFeed";
import NewsCategorySkeleton from "../components/NewCategorySkeleton";
import ImageWithFallback from "../components/ImageWithFallBack";
import { INews } from "../types";

const PersonalizedNewsFeed: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { newsFeeds, isLoading } = useNewsFeed();

  if (!user) navigate("/", { replace: true });
  return (
    <div className="flex flex-wrap items-center justify-between max-w-screen-xl min-h-screen px-4 mx-auto">
      <section className="flex flex-wrap items-center justify-center max-w-screen-xl px-4 pt-3 mx-auto">
        <h1 className="px-5 pb-3 text-4xl text-center font-heading dark:text-white">
          Personalized News Feed
        </h1>
         {isLoading && <NewsCategorySkeleton />}
        {newsFeeds && (
          <div className="grid border-b border-black gap-y-4 md:grid-cols-2 lg:grid-cols-3 border-x">
            {Object.keys(newsFeeds).map(
              (key) =>
                key &&
                newsFeeds[key].map((item: INews) => (
                  <div
                    className="relative grid-cols-1 p-5 border-black border-y"
                    key={item.id}
                  >
                    <ImageWithFallback
                      src={item.images.url}
                      alt={item.title}
                      className=""
                    />
                    <h4 className="mb-4 text-sm font-bold font-body dark:text-white">
                      {item.title?.slice(0, 100)}
                      <a
                        href={item.url}
                        target="_blank"
                        className="inline-block ml-2 text-xs text-red-1x"
                      >
                        Read More
                      </a>
                    </h4>
                    <small className="absolute block bottom-2 right-4">
                      {item.publishedAtFormatted}
                    </small>
                  </div>
                ))
            )}
          </div>
        )}
        {!isLoading && newsFeeds?.length < 1 && (
          <div className="flex justify-center w-full h-full">
            <h5 className="mt-20 text-xl font-bold dark:text-white">No news found!!!</h5>
            <small>You can update your news settings to see more news</small>
          </div>
        )}
      </section>
    </div>
  );
};

export default PersonalizedNewsFeed;
