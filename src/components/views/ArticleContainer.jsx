import React, {useEffect, useState}  from 'react'
import Image from 'next/image'
import LikeCounter from '@/components/articles/LikeCounter'
import { useRouter } from 'next/router'
import ArticleView from '@/components/articles/ArticleView';
import Controls from '@/components/articles/Controls';


export default function Article(props) {
  const {className, article} = props;
  const router = useRouter()
  const [technicalMessage, setTechnicalMessage] = useState(null);

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
