'use client'


import React, {useEffect, useState}  from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'
import fetchFromApi from '@/scripts/fetchFromApi'
import ShowIf from './ui/ShowIf'
import CustomInput from './ui/inputs/CustomInput';
import ArticleView from './ui/ArticleView';
import ArticlePreview from './ui/ArticlePreview';

async function fetchArticle(url, title) {
  return await fetchFromApi(url, {title: title})
}


export default function Article({className}) {

  const router = useRouter()
  const [article, setArticle] = useState({})
  const [isArticleLoaded, setIsArticleLoaded] = useState(false);
  const [technicalMessage, setTechnicalMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('')
  const [articles, setArticles] = useState([]);

  async function loadArticle(title) {
    if ((!title)) return;
    try {
      setArticle((await fetchArticle('/api/v1/articles/get', title)).data);
      if (title) {
        setIsArticleLoaded(true)
      }
    }
    catch (error) {
      if (!(error.response)) throw error;
      if (error.response.status === 404 && title) {
        setTechnicalMessage(
          <div>
            <div className='font-bold'>
              404 | Sorry, article with this title was not found
            </div>
          </div>
        )
        return
      }
      throw error

    }
  }

  function updateSearchQuery(e) {
    setSearchQuery(e.target.value)
  }

  async function loadArticlePreviews(query) {
    try {
      setArticles((await fetchFromApi('/api/v1/articles/get/previews', {q: query})).data);
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
      loadArticle(router.query.title)
  }, [router.isReady, router.query])

  useEffect(() => {
    loadArticlePreviews(searchQuery)
  }, [searchQuery])


  return (
    <div className={'container md:shadow-lg max-w-screen-md mx-auto p-4 ' + className}>
    <div>{technicalMessage}</div>
      <ShowIf isVisible={!isArticleLoaded}>
        <CustomInput className="mb-2" label={<h2 className='font-bold text-2xl'>Search</h2>} onChange={updateSearchQuery}/>
        <ul>
          <li>
            {articles.map((article) => {
                return <ArticlePreview key={article._id} article={article}/>
              })}
          </li>
        </ul>
      </ShowIf>
        <ArticleView article={article} />
      <ShowIf isVisible={isArticleLoaded}>
      </ShowIf>
    </div>
  )
}
