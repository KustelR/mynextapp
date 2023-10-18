import React from 'react'

import SendableForm from './SendableForm'
import CustomInput from './ui/CustomInput'
import CustomTextArea from './ui/CustomTextArea'
import TextButton from './ui/TextButton'
import { sendFormData } from '@/scripts/forms/sendArticle'

export default function ArticleWrite() {
  return (
    <div className='container md:shadow-lg max-w-screen-md mx-auto p-4 bg-white dark:bg-neutral-800'>
        <SendableForm 
            href="/api/v1/articles/create"
            submitHandler={sendFormData}>
            <CustomInput 
                id="title" 
                placeholder="Your title..."
                className="mb-4" />
            <CustomTextArea id="body" placeholder="Your text here..."></CustomTextArea>
            <CustomInput label="Tags" id="tags" placeholder="text" className="mb-4"></CustomInput>
            <TextButton>POST ARTICLE</TextButton>
            </SendableForm>
        </div>
  )
}
