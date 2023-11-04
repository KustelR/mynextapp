import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TextButton from '@/components/ui/TextButton';
import NextLink from 'next/link'
import reqAuth from '@/scripts/reqAuth';
import UnixToUTC from '@/scripts/UnixToUTC';
import Head from 'next/head';



function ArticleControls(props) {
    const {_id, addMessage, onAction} = props;
    return (
        <ul className='flex'>
            <li className='mr-1'>
                <NextLink href={'/articles/' + _id}><TextButton>Open</TextButton></NextLink>
            </li>
            <li className='mr-1'>
                <TextButton onClick={async () => {
                    const response = await reqAuth("/api/v2/articles", {params: {_id: _id}}, axios.delete)
                    addMessage(response.status);
                    onAction();}
                    }>
                    Delete
                </TextButton>
            </li>
        </ul>
    )
}


export default function ArticleTable(props) {
    const {addMessage, onRowSelect} = props;

    const [articles, setArticles] = useState([]);
    const [changes, setChanges] = useState(0);

    function genSelectObject(article) {
        let result = article;
        result.controls = {type: "ReactComponent", component: 
                            ArticleControls, props: 
                                {_id: article._id, 
                                addMessage: addMessage, 
                                onAction: () => {setChanges(changes + 1)
                            }}}
        return result
    }

    useEffect(() => {
        async function loadArticles() {
            try {
                const response = await axios.get('/api/v2/articles');
                setArticles(response.data);
            }
            catch (error) {
                addMessage(error.message);
            }
        }
        loadArticles();
    }, [changes])

  return (
    <table className='table-auto sortable w-full'>
        <Head>
            <script src="https://www.kryogenix.org/code/browser/sorttable/sorttable.js"></script>
        </Head>
        <thead className='font-bold border-b-2 border-neutral-500'>
            <tr className='bg-neutral-100 dark:bg-neutral-700 items-start'>
                <th className='px-2 text-start'>Title</th>
                <th className='px-2 text-start'>Author</th>
                <th className='px-2 text-start'>Votes</th>
                <th className='px-2 text-start'>Post time</th>
                <th className='px-2 text-start'>Tags</th>
            </tr>
        </thead>
        <tbody>
            {articles.map(article => {return (
            <tr className='hover:bg-neutral-200 dark:hover:bg-neutral-600 even:bg-neutral-100 dark:even:bg-neutral-700' 
                onClick={() => {onRowSelect(genSelectObject(article))}} 
                key={article._id}>
                <td className='px-2'><span className='line-clamp-1'>{article.title}</span></td>
                <td className='px-2'>{article.authorLogin}</td>
                <td className='px-2'>{article.votes}</td>
                <td className='px-2'><span className='line-clamp-1'>{UnixToUTC(article.postTime)}</span></td>
                <td className='px-2'><span className='line-clamp-1'>{article.tags.join(', ')}</span></td>
            </tr>
        )})}
        </tbody>
    </table>
  )
}
