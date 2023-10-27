import '@/app/globals.css'

import React, {useEffect, useState}  from 'react'
import fetchFromApi from '@/scripts/fetchFromApi'
import CustomInput from '@/components/ui/inputs/CustomInput';
import ArticlePreview from '@/components/ArticlePreview';
import PageComponent from '@/components/spalike/PageComponent';


export default function Home() {

  const [searchQuery, setSearchQuery] = useState('')
  const [articles, setArticles] = useState([]);


  function updateSearchQuery(e) {
    setSearchQuery(e.target.value)
  }

  async function loadArticlePreviews(query) {
    try {
      setArticles((await fetchFromApi('/api/v1/articles/previews', query)).data);
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadArticlePreviews(searchQuery)
  }, [searchQuery])


    return (
      <PageComponent>
      <div className='container md:shadow-lg max-w-screen-md mx-auto p-4 bg-white dark:bg-neutral-800'>
        <CustomInput className="mb-2" label={<h2 className='font-bold text-2xl'>Search</h2>} onChange={updateSearchQuery}/>
        <ul>
          <li>
            {articles.map((article) => {
                return <ArticlePreview key={article._id} article={article}/>
              })}
          </li>
        </ul>
      </div>
      </PageComponent>
    )
  }
  