import React from 'react'
import ArticleView from '@/components/articles/ArticleView';

const LikeCounter = React.lazy(() => import('@/components/articles/LikeCounter'))
const Controls = React.lazy(() => import('@/components/articles/Controls'))


export default function Article(props) {
  const {className, article} = props;

  return (
    <div className={'container md:shadow-lg max-w-screen-md mx-auto p-4 border-2 border-neutral-50 dark:border-neutral-700 ' + className}>
      <ArticleView style={{minHeight: '600px'}} article={article} />
      <div className='flex justify-between border-t-2 border-neutral-400 dark:border-neutral-700 py-1'>
        <LikeCounter articleId={article._id} />
        <Controls article={article}></Controls>
      </div>
    </div>
  )
}
