'use client'


import React, {useState, useEffect} from 'react';
import '../app/globals.css';
import ErrorBox from '@/components/ui/popups/ErrorBox';
import PageComponent from '@/components/spalike/PageComponent'
import fetchFromApi from '@/scripts/fetchFromApi';
import ShowIf from '@/components/ui/ShowIf';
import TextButton from '@/components/ui/TextButton';
import ArticlePreview from '@/components/ArticlePreview';
import axios from 'axios';
import Image from 'next/image';


async function fetchUser(accessToken) {
    return await axios.get('/api/v1/users/me', {headers: {"x-access-token": accessToken}})
}


async function handleFetchUser() {
  let accessToken = localStorage.getItem('accessToken');
  let response;
  try {
    response = await fetchUser(accessToken);
    return response;
  }
  catch (err) {
    response = err.response;
    if (response.data) {
      const refreshToken = localStorage.getItem('refreshToken');
      let refreshMessage;
      if (response.data.message === 'jwt expired') {
        refreshMessage = await fetchFromApi('/auth/v1/accesstoken', {refresh_token: refreshToken});
      }
      
      if (refreshMessage && refreshMessage.data) {
        accessToken = refreshMessage.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        return await fetchUser(accessToken);
      }
    }
  }
  
}


export default function Personal() {

  const [userdata, setUserdata] = useState({})
  const [articles, setArticles] = useState([]);

  function loadUser() {
    if (!localStorage.getItem('accessToken')) {
      return 1;
    }
    try {
      handleFetchUser().then(response => {setUserdata(response? response.data.user : {errorMessage: "user is not loaded"})})
    }
    catch (error) {
      alert(error);
    }
  }

  async function loadArticles() {
    try {
      setArticles((await fetchFromApi('/api/v1/articles/previews', {authorLogin: userdata.login})).data);
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadUser();
  }, [])

  useEffect(() => {
    loadArticles()
  }, [userdata])


  return (
    <PageComponent>
      <div className='bg-white dark:bg-neutral-800 md:w-10/12 lg:w-8/12 md:max-w-6xl mx-auto shadow-2xl p-3'>
        <ShowIf isVisible={!!userdata.errorMessage}>
          <ErrorBox title='Failure' body={userdata.errorMessage}/>
        </ShowIf>
        <h2 className='text-2xl font-bold mb-2 border-b-2 border-gray-500 p-2'>Personal profile of {userdata.login}</h2>
        <div className='md:flex justify-between my-2 border-b-2 border-gray-500 p-2'>
          <div>
            <p>Your nickname: {userdata.nickname}</p>
            <p>Your email: {userdata.email}</p>
            <p>Registration date: nope</p>
          </div>
          <div className='my-8 md:my-0 w-fit justify-center'>
            <div className='flex justify-center'>
              <Image 
                src="https://sun9-31.userapi.com/impg/oYrL3D_7BRT3mOgV43OYbebkf9GXhF5U6pPsRA/WMhdLR7cGhU.jpg?size=1024x1024&quality=95&sign=34fd47c61d7e51d9681d09fdbe207e02&type=album" 
                alt='profile picture'
                height={100}
                width={200}
                />
            </div>
            <TextButton className='w-full mt-2'>Change profile picture</TextButton>
          </div>
        </div>
        <div className='my-2 border-b-2 border-gray-500 p-2'>
        <h3 className='text-xl font-semibold'>Your articles:</h3>
        <ul>
          <li>
            {articles.map((article) => {
                return <ArticlePreview key={article._id} article={article}/>
              })}
          </li>
        </ul>
        </div>
        <h3 className='text-xl font-semibold'>Controls</h3>
        <TextButton className='mr-2'>Change password</TextButton>
        <TextButton className='mr-2'>Change email</TextButton>
        <TextButton className='mr-2'>Change nickname</TextButton>
        <TextButton className='ml-auto mr-0'>Delete account</TextButton>
      </div>
    </PageComponent>
  )
}
