import React, {useEffect, useState}  from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import fetchFromApi from '@/scripts/fetchFromApi'
import ArticleView from './ArticleView';


async function fetchArticle(url, title) {
  return await fetchFromApi(url, {title: title})
}


export default function Article({className}) {
  const router = useRouter()
  const [article, setArticle] = useState({})
  const [technicalMessage, setTechnicalMessage] = useState(null);

  async function loadArticle(title) {
    setTechnicalMessage(
      <div>
        <div className='font-bold'>
          Wait | Sorry, we are loading article...
        </div>
      </div>
    )
    if ((!title)) return;
    try {
      setArticle((await fetchArticle('/api/v1/articles/get', title)).data);
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
    setTechnicalMessage(null);
  }

  useEffect(() => {
      loadArticle(router.query.title)
  }, [router.isReady, router.query])


  return (
    <div className={'container md:shadow-lg max-w-screen-md mx-auto p-4 min-h-screen ' + className}>
    <div>{technicalMessage}</div>
      <ArticleView article={article} />
    </div>
  )
}
