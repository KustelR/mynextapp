import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'
import UnixToUTC from '@/scripts/UnixToUTC'


export default function ArticleView({article}) {
  return (
    <div className='prose lg:prose-lg dark:prose-invert max-w-none font-serif'>
      <h2 className='font-sans'>{article.title}</h2>
      <div className='opacity-60'>
        <span>{UnixToUTC(article.postTime)}</span> | <span>{article.authorLogin}</span>
      </div>
      <div dangerouslySetInnerHTML={{__html: article.body}}/>

      <div className='border-t-2 border-neutral-400'>
        <button className='mr-4 text-green-400 dark:text-green-600'><FontAwesomeIcon className='mr-1' icon={faArrowUp} />{article.upvotes}</button>
        <span className='mr-4 font-bold'>{article.upvotes - article.downvotes}</span>
        <button className=' text-red-400 dark:text-red-600'>{article.downvotes}<FontAwesomeIcon className='ml-1' icon={faArrowDown} /></button>
      </div>
    </div>
  )
}
