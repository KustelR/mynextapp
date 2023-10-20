import React from 'react'
import Link from 'next/link'


function UnixToUTC(time) {
    const date = new Date(time);

    const minutes = date.getMinutes()
    const hours = date.getHours();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}.${month}.${year}`
}


export default function ArticlePreview({article}) {
  return (
    <Link href={"/articles?title=" + article.title}>
        <div className='w-full hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 mb-2'>
            <div className='md:flex'>
                <h3 className='font-bold mr-2'>{article.title}</h3>
                <div className='opacity-60'>
                    <span className='mr-2'>{article.authorLogin}</span>
                    <span>{article.postTime ? UnixToUTC(article.postTime) : ''}</span>
                </div>
            </div>
            <p>{article.description}</p>
            <div>
            <strong>Tags: </strong>
                <ul>
                    <li>{article.tags.map((tag) => {return (<span key={tag} className='mr-1 p-1 bg-neutral-300 dark:bg-neutral-500 dark:rounded-lg'>{tag}</span>)})}</li>
                </ul>
            </div>
        </div>
    </Link>
  )
}
