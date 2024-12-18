import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import "@/app/globals.css";
import { get } from "axios";

import ArticleContainer from "@/components/views/ArticleContainer";

export default function ReadArticle({ article }) {
  useEffect(() => {
    let isDarkTheme = false;
    localStorage.getItem("theme") === "dark"
      ? (isDarkTheme = true)
      : (isDarkTheme = false);
    if (isDarkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  return (
    <div
      className={
        "bg-neutral-100 dark:bg-neutral-900 dark:text-white min-h-screen"
      }
    >
      <Head>
        <title>{article.title}</title>
        <meta></meta>
      </Head>
      <nav className="h-16 flex justify-center items-center bg-gray-200 dark:bg-gray-800 mb-4">
        <Link href="/app/browse">
          <span className="p-4 rounded-lg bg-opacity-0 hover:bg-opacity-20 bg-black">
            Back to article browser
          </span>
        </Link>
      </nav>
      <div>
        <ArticleContainer
          className="bg-white dark:bg-neutral-800"
          article={article}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await get("http://localhost:5000/api/v2/articles", {
    params: { _id: context.params.id },
    headers: { "x-article-limit": 1 },
  });
  const article = response.data;

  return {
    props: {
      article,
    },
  };
}
