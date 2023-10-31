import React from 'react'
import axios from 'axios'
import TextButton from '@/components/ui/TextButton'


async function handleDeletion(article) {
    await axios.delete("/api/v1/articles", {headers: {'x-access-token': localStorage.getItem('accessToken')}, params: {'_id': article._id}})
  }


export default function ArticleControls({article}) {
  return (
    <span>
        <TextButton
        ariaLabel="Delete article" 
        className="mr-2 p-0 px-1"
        onClick={() => {handleDeletion(article)}}>
        Delete
        </TextButton>
        <TextButton 
        className='p-0 px-1'
        ariaLabel="Change article" >
        Change
        </TextButton>
    </span>
  )
}
