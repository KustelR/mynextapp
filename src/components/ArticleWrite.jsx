import React, {useState} from 'react'

import SendableForm from './SendableForm'
import CustomInput from './ui/inputs/CustomInput'
import CustomTextArea from '@/components/ui/inputs/CustomTextArea'
import TextButton from './ui/TextButton'
import { sendFormData } from '@/scripts/forms/sendArticle'
import RichTextEditor from '@/components/ui/inputs/RichTextEditor'

export default function ArticleWrite({className}) {

  const [articleBody, setArticleBody] = useState();

  return (
    <div className={'container md:shadow-lg max-w-screen-md mx-auto p-4 ' + className}>
        <SendableForm 
            href="/api/v1/articles/create"
            submitHandler={(url, element, callback) => {sendFormData(url, element, callback, [["body", articleBody], ["accessToken", localStorage.getItem('accessToken')]])}}>
            <CustomInput
              label="Title" 
              id="title" 
              placeholder="Your title..."
              className="mb-4" />
              <RichTextEditor 
                className="mb-4 min-h-screen" 
                label="Article body" 
                onChange={(e) => {setArticleBody(e)}}/>
              <CustomTextArea 
                className="mb-4" 
                label="Short description" 
                id="description" />
            <CustomInput 
              autoComplete="off" 
              label="Tags" 
              id="tags" 
              placeholder="text" 
              className="mb-4" />
            <TextButton>POST ARTICLE</TextButton>
            </SendableForm>
        </div>
  )
}
