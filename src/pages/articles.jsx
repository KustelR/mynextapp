import '../app/globals.css'

import ArticleContainer from "../components/ArticleContainer"
import PageComponent from '@/components/spalike/PageComponent'


export default function Home() {
    return (
      <PageComponent>
        <ArticleContainer className="bg-white dark:bg-neutral-900"/>
      </PageComponent>
    )
  }
  