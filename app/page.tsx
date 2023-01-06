import React from "react";
import { categories } from "../constants";
import fetchNews from "../lib/fetchNews";
import NewsList from "./NewsList";

const HomePage = async () => {
  // fetch the news data
  const news: NewsResponse = await fetchNews(categories.join(","));

  return (
    <div>
      <NewsList news={news} />
    </div>
  );
};

export default HomePage;
