import '../../app/globals.css'


import React from 'react'
import ArticleContainer from "../../components/ArticleContainer"
import PageComponent from '@/components/spalike/PageComponent';


export default function read() {
  return (
    <PageComponent>
        <ArticleContainer className="bg-white dark:bg-neutral-900"/>
    </PageComponent>
  )
}
