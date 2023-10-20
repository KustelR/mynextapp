import React from 'react'

export default function ArticleView({article}) {
  return (
    <article className='prose lg:prose-lg dark:prose-invert max-w-none font-serif'>
        <h2 className='font-sans'>{article.title}</h2>
        <div dangerouslySetInnerHTML={{__html: article.body}}/>
    </article>
  )
}
