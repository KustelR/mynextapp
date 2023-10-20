import '../app/globals.css'

import ArticleWrite from '@/components/ArticleWrite'
import PageComponent from '@/components/spalike/PageComponent'

export default function Home() {
    return (
    <PageComponent>
        <ArticleWrite className="bg-white dark:bg-neutral-900"></ArticleWrite>
    </PageComponent>
    )
}