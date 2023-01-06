import { categories } from "../../../constants";
import fetchNews from "../../../lib/fetchNews";
import NewsList from "../../NewsList";
import React from "react";

type Props = {
  params: { category: Category };
};

async function CategoryPage({ params: { category } }: Props) {
  const news: NewsResponse = await fetchNews(category);

  return (
    <div>
      <h1 className="headerTitle">{category}</h1>
      <NewsList news={news} />
    </div>
  );
}

export default CategoryPage;

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category,
  }));
}
