import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";
import reqAuth from "@/scripts/reqAuth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

async function voteArticle(articleId, voteChange) {
  await reqAuth(
    "/api/v2/articles/vote",
    {
      headers: { "x-access-token": localStorage.getItem("accessToken") },
      params: { _id: articleId },
    },
    axios.put,
    {
      voteChange: voteChange,
    }
  );
}

async function getLikes(articleId) {
  const response = await reqAuth("/api/v2/articles", {
    headers: { "x-article-limit": 1 },
    params: { _id: articleId },
  });
  return { likes: response.data.votes, yourVote: response.data.requesterVote };
}

/**
 *
 * @param {*} props
 * @param {object} props.article
 * @returns
 */
export default function LikeCounter(props) {
  const { articleId } = props;
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(null);

  async function updateLikes() {
    const likeData = await getLikes(articleId);
    setLikeCount(likeData.likes);
    if (likeData.yourVote === 1) {
      setIsLiked(true);
    } else if (likeData.yourVote === -1) {
      setIsLiked(false);
    } else {
      setIsLiked(null);
    }
  }

  async function like() {
    await voteArticle(articleId, 1);
    await updateLikes();
  }

  async function dislike() {
    await voteArticle(articleId, -1);
    await updateLikes();
  }

  useEffect(() => {
    async function loadLikes() {
      const likeData = await getLikes(articleId);
      setLikeCount(likeData.likes);
      if (likeData.yourVote === 1) {
        setIsLiked(true);
      } else if (likeData.yourVote === -1) {
        setIsLiked(false);
      }
    }
    loadLikes();
  }, []);

  const upvoteClassNames = classNames(
    "px-2 mr-4 text-green-400 dark:text-green-600 rounded-xl border-2",
    { "border-green-300 dark:border-green-700": isLiked === true }
  );
  const downvoteClassNames = classNames(
    "px-2 text-red-400 dark:text-red-600 rounded-xl border-2",
    { "border-red-300 dark:border-red-700": isLiked === false }
  );

  return (
    <span>
      <button
        aria-label="Like article"
        className={upvoteClassNames}
        onClick={() => {
          like();
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
      <span className="mr-4 font-bold">{likeCount}</span>
      <button
        aria-label="Dislike article"
        className={downvoteClassNames}
        onClick={() => {
          dislike();
        }}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
    </span>
  );
}
