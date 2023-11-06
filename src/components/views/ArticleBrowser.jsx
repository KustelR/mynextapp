import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomInput from "@/components/ui/inputs/CustomInput";
import ArticlePreview from "@/components/articles/ArticlePreview";
import TextButton from "@/components/ui/TextButton";

function LoadingPlaceholder() {
  return <div className="items-center justify-center">Loading</div>;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);

  function updateSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  async function loadArticlePreviews(query) {
    try {
      setArticles(
        (await axios.get("/api/v1/articles/previews", { params: query })).data
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadArticlePreviews(searchQuery);
  }, [searchQuery]);

  return (
    <div className="container md:shadow-lg max-w-screen-md mx-auto p-4 bg-white dark:bg-neutral-800">
      <div>
        <h2 className="font-bold text-2xl">Search articles</h2>
      </div>
      <div className="flex mb-8">
        <CustomInput
          className="text-2xl w-full h-10 mr-1"
          inputClassName="h-[38px]"
          onChange={updateSearchQuery}
        />
        <TextButton className="h-max mr-1">Search</TextButton>
        <TextButton className="h-max">Filters</TextButton>
      </div>
      <ul>
        <li>
          {articles.map((article) => {
            return <ArticlePreview key={article._id} article={article} />;
          })}
        </li>
      </ul>
    </div>
  );
}
