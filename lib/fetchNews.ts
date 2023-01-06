import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  // GraphQL query
  const query = gql`
    query MyQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        keywords: $keywords
        countries: "us, gb"
        sort: "published_desc"
      ) {
        data {
          author
          category
          country
          description
          image
          language
          published_at
          source
          title
          url
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;

  // Fetch function with Next.js 13 caching...
  const res = await fetch("https://alma.stepzen.net/api/lead/__graphql", {
    method: "POST",
    cache: isDynamic ? "no-cache" : "default",
    next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        access_key: process.env.MEDIASTACK_API_KEY,
        categories: category,
        keywords: keywords,
      },
    }),
  });

  console.log(
    "LOADING NEW DATA FROM API for category >>>> ",
    category,
    keywords
  );

  const newsResponse = await res.json();

  // Sort function by images vs. no images

  const news = sortNewsByImage(newsResponse?.data?.myQuery);
  // Return the sorted array
  return news;
};

export default fetchNews;

// stepzen import curl http://api.mediastack.com/v1/news?access_key=7113939332f54df2947d6c2d8b285877&sources=business,sports

// optional parameters:

// & sources = cnn,bbc
// & categories = business,sports
// & countries = us,au
// & languages = en,-de
// & keywords = virus,-corona
// & sort = published_desc
// & offset = 0
// & limit = 100
