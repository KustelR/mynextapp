import React, {useEffect, useState}  from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import fetchFromApi from '@/scripts/fetchFromApi'
import ArticleView from './ArticleView';


export default function Article({className}) {
  const router = useRouter()
  const [article, setArticle] = useState({})
  const [technicalMessage, setTechnicalMessage] = useState(null);

  async function loadArticle(query) {
    setTechnicalMessage(
      <div>
        <div className='font-bold'>
          Wait | Sorry, we are loading article...
        </div>
      </div>
    )
    if ((!query)) return;
    try {
      const response = await fetchFromApi("/api/v1/articles", query)
      setArticle(response.data);
      
    }
    catch (error) {
      if (!(error.response)) throw error;
      if (error.response.status === 404 && query) {
        setTechnicalMessage(
          <div>
            <div className='font-bold'>
              404 | Sorry, such article was not found
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
      loadArticle(router.query)
  }, [router.isReady, router.query])


  return (
    <div className={'container md:shadow-lg max-w-screen-md mx-auto p-4 ' + className}>
      <div>{technicalMessage}</div>
      <ArticleView article={article} />
    </div>
  )
}
