'use client'


import React, {useEffect, useState}  from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import fetchFromApi from '@/scripts/fetchFromApi'

async function fetchArticle(url, title) {
  return await fetchFromApi(url, {title: title})
}


export default function Article() {

  const router = useRouter()
  const [article, setArticle] = useState({})

  function loadArticle(title) {
    console.log(title)
    fetchArticle('/api/v1/articles/get', title).then(response => {setArticle(response.data); console.log(article)})
  }


  useEffect(() => {
    if(!router.isReady) return;
    loadArticle(router.query.title)
  }, [router.isReady])


  return (
    <div className='container md:shadow-lg max-w-screen-md mx-auto p-4 bg-white dark:bg-neutral-800'>
      <div className=''>
          <article className='prose lg:prose-lg dark:prose-invert max-w-none font-serif'>
          <h1 className='font-sans'>{article.title}</h1>
          <p>{article.body}</p>
        </article>
      </div>
    </div>
  )
}
