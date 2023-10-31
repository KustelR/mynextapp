import React, {useState} from 'react'
import UnixToUTC from '@/scripts/UnixToUTC'


export default function ArticleView({article, className, style}) {
  return (
    <div className={className} style={style}>
      <div className='border-b-2 border-neutral-400'>
        <h2 className='font-sans font-bold text-3xl mb-4'>{article.title}</h2>
        <div className='opacity-60 text-xl'>
          <span>{UnixToUTC(article.postTime)}</span> | <span>by {article.authorLogin}</span>
        </div>
      </div>
      <div className='prose lg:prose-lg dark:prose-invert max-w-none font-serif'>
      <div dangerouslySetInnerHTML={{__html: article.body}}/>
    </div>
    </div>
  )
}
