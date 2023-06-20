import React from "react";
import TopHeadline from "../components/Healine";
import NewsCategory from "../components/NewsCategory";
import { useNews } from "../Api/useNews";
import NewsCategorySkeleton from "../components/NewCategorySkeleton";

const Home: React.FC = () => {
  const { news, isLoading } = useNews();
  return (
    <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
      <TopHeadline />

      {isLoading && <NewsCategorySkeleton />}
      {news &&
        Object.keys(news).map((key) => {
          return key && <NewsCategory news={news[key]} title={key} key={key} />;
        })}
    </div>
  );
};

export default Home;
