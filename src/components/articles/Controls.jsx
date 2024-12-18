import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import TextButton from "@/components/ui/TextButton";

const ShowIf = React.lazy(() => import("@/components/ui/ShowIf"));

import Link from "next/link";

async function handleDeletion(article) {
  await axios.delete("/api/v2/articles", {
    headers: { "x-access-token": localStorage.getItem("accessToken") },
    params: { _id: article._id },
  });
}

export default function ArticleControls({ article }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (article.authorLogin === localStorage.getItem("login")) {
      setIsVisible(true);
    }
  }, [article]);
  return (
    <span>
      <Suspense fallback={<div></div>}>
        <ShowIf isVisible={isVisible}>
          <TextButton
            ariaLabel="Delete article"
            className="mr-2 p-0 px-1"
            onClick={() => {
              handleDeletion(article);
            }}
          >
            Delete
          </TextButton>
          <Link href={"/app/article/write?_id=" + article._id}>
            <TextButton className="p-0 px-1" ariaLabel="Change article">
              Change
            </TextButton>
          </Link>
        </ShowIf>
      </Suspense>
    </span>
  );
}
