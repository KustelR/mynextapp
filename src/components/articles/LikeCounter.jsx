import React, {useState, useEffect} from 'react'
import axios from 'axios'
import classNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'


async function voteArticle(article, voteChange) {
    await axios.put("/api/v1/articles/vote", {voteChange: voteChange}, {headers: {'x-access-token': localStorage.getItem('accessToken')}, params: {'_id': article._id}})
  }


/**
 * 
 * @param {*} props
 * @param {object} props.article 
 * @returns 
 */
export default function LikeCounter(props) {
    const {article} = props;

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeOffset, setLikeOffset] = useState(0);
    const [likeCount, setLikeCount] = useState(0);

    function like() {
        if (liked) {setLiked(false); setLikeOffset(0); return}
        setLiked(true);
        setDisliked(false);
        setLikeOffset(1)
    }

    function dislike() {
        if (disliked) {setDisliked(false); setLikeOffset(0); return}
        setDisliked(true);
        setLiked(false);
        setLikeOffset(-1);
    }

    useEffect(() => {
      if (article.requesterVote == 1) {
        setLikeCount(article.votes - 1)

        like();
      }
      else if (article.requesterVote == -1) {
        setLikeCount(article.votes + 1)

        dislike();
      }
      else {
        setLikeCount(article.votes);
      }
    }, [article.requesterVote])

    const upvoteClassNames = classNames('px-2 mr-4 text-green-400 dark:text-green-600 rounded-xl border-2', {'border-green-300 dark:border-green-700': liked})
    const downvoteClassNames = classNames('px-2 text-red-400 dark:text-red-600 rounded-xl border-2', {'border-red-300 dark:border-red-700': disliked})

  return (
    <span>
          <button 
            className={upvoteClassNames}
            onClick={() => {voteArticle(article, 1); like()}}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <span className='mr-4 font-bold'>{likeCount + likeOffset}</span>
          <button 
            className={downvoteClassNames}
            onClick={() => {voteArticle(article, -1); dislike()}}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </span>
  )
}
