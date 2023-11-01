import React, {useEffect, useState}  from 'react'
import Image from 'next/image'
import LikeCounter from '@/components/articles/LikeCounter'
import { useRouter } from 'next/router'
import fetchFromApi from '@/scripts/fetchFromApi'
import ArticleView from '@/components/articles/ArticleView';
import Controls from '@/components/articles/Controls';


export default function Article({className, onLoad}) {
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
      const response = await fetchFromApi("/api/v1/articles", query, {"x-access-token": localStorage.getItem("accessToken")});
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
    if (typeof(onLoad) === "function") onLoad();
  }

  useEffect(() => {
    const query = router.query;
    if (Object.keys(query).length === 0 && query.constructor === Object) return;
    loadArticle(query);
  }, [router.isReady, router.query])


  return (
    <div className={'container md:shadow-lg max-w-screen-md mx-auto p-4 ' + className}>
      <div>{technicalMessage}</div>
      <ArticleView style={{minHeight: '600px'}} article={article} />
      <div className='flex justify-between border-t-2 border-neutral-400 py-1'>
        <LikeCounter article={article} />
        <Controls article={article}></Controls>
      </div>
    </div>
  )
}
