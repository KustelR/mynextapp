import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'
import TextButton from '@/components/ui/TextButton'
import UnixToUTC from '@/scripts/UnixToUTC'
import axios from 'axios'


async function handleDeletion(article) {
  await axios.delete("/api/v1/articles", {headers: {'x-access-token': localStorage.getItem('accessToken')}, params: {'_id': article._id}})
}


export default function ArticleView({article}) {
  return (
    <div>
      <div className='border-b-2 border-neutral-400'>
        <h2 className='font-sans font-bold text-3xl mb-4'>{article.title}</h2>
        <div className='opacity-60 text-xl'>
          <span>{UnixToUTC(article.postTime)}</span> | <span>by {article.authorLogin}</span>
        </div>
      </div>
      <div className='prose lg:prose-lg dark:prose-invert max-w-none font-serif'>
      <div dangerouslySetInnerHTML={{__html: article.body}}/>
      <div className='flex justify-between border-t-2 border-neutral-400 py-1'>
        <span>
          <button className='mr-4 text-green-400 dark:text-green-600'>
            <FontAwesomeIcon className='mr-1' icon={faArrowUp} />
            {article.upvotes}
          </button>
          <span className='mr-4 font-bold'>{article.votes}</span>
          <button className=' text-red-400 dark:text-red-600'>
            {article.downvotes}
            <FontAwesomeIcon className='ml-1' icon={faArrowDown} />
          </button>
        </span>
        <span>
          <TextButton 
            className="mr-2 p-0 px-1"
            onClick={() => {handleDeletion(article)}}>
            Delete
          </TextButton>
          <TextButton className='p-0 px-1'>
            Change
          </TextButton>
        </span>
      </div>
    </div>
    </div>
  )
}
