import React, {useState} from 'react'
import TextButton from '@/components/ui/TextButton'
import LikeCounter from './LikeCounter'
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
      <LikeCounter article={article} />
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
