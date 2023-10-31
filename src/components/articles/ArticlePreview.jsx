import React from 'react'
import Link from 'next/link'
import UnixToUTC from '@/scripts/UnixToUTC'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'


export default function ArticlePreview({article}) {
  return (
    <Link href={"/article?_id=" + article._id}>
        <div className='w-full bg-neutral-50 hover:bg-neutral-100 dark:bg-transparent dark:hover:bg-neutral-700 p-2 mb-2'>
            <div className='md:flex'>
                <h3 className='font-bold mr-2'>{article.title}</h3>
                <div className='opacity-60'>
                    <span className='mr-2 font-semibold'>{article.authorLogin}</span>
                    <span>{article.postTime ? UnixToUTC(article.postTime) : ''}</span>
                </div>
            </div>
            <p className='description'>
                {article.description}
            </p>
            <div>
            <strong>Tags: </strong>
                <ul>
                    <li>{article.tags.map((tag) => {return (<span key={tag} className='mr-1 p-1 bg-neutral-300 dark:bg-neutral-500'>{tag}</span>)})}</li>
                </ul>
            </div>
            <div className='mt-4'>
                <span className='mr-4 font-bold'><FontAwesomeIcon className='mr-1' icon={faArrowUp} />{article.votes}<FontAwesomeIcon className='ml-1' icon={faArrowDown} /></span>
            </div>
        </div>
    </Link>
  )
}
