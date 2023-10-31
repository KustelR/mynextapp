import React, {useState, useEffect} from 'react'
import classNames from 'classnames'
import Head from 'next/head'
import Link from 'next/link'
import '../app/globals.css';

import ArticleContainer from '@/components/views/ArticleContainer';


export default function ReadArticle() {

  const [isArticleLoaded, setIsArticleLoaded] = useState(false);


  useEffect(() => {
    let isDarkTheme = false;
    localStorage.getItem("theme") === "dark" ? 
      isDarkTheme = true : 
      isDarkTheme = false;
    if (isDarkTheme) {
      document.body.classList.add('dark');
    }
    else {
      document.body.classList.remove('dark');
    }
  }, [])

  const articleClassNames = classNames(
    {'hidden': !isArticleLoaded}
  )

  return (
    <div className={'bg-neutral-100 dark:bg-neutral-900 dark:text-white min-h-screen'}>
      <Head>
      </Head>
        <nav className='h-16 flex justify-center items-center bg-gray-200 dark:bg-gray-800 mb-4'>
        <Link href="/app/browse">
          <span className='p-4 rounded-lg bg-opacity-0 hover:bg-opacity-20 bg-black'>
            Back to article browser
          </span>
        </Link>
        </nav>
      <div className={articleClassNames}>
        <ArticleContainer className="bg-white dark:bg-neutral-800" onLoad={() => {setIsArticleLoaded(true)}}/>
      </div>
    </div>
  )
}
