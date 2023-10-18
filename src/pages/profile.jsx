'use client'


import React, {useState, useEffect} from 'react';
import '../app/globals.css';
import PageComponent from '@/components/spalike/PageComponent'
import fetchFromApi from '@/scripts/fetchFromApi';
import axios from 'axios';
import Image from 'next/image';


async function fetchUser(accessToken) {
  return new Promise(function(resolve, reject) {
    axios.get('/api/v1/users/me', 
      {params: {access_token: accessToken}})
    .then(response => {resolve(response)})
    .catch(err => {reject(err);});
  })
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
    console.log(response);
    if (response.data) {
      const refreshToken = localStorage.getItem('refreshToken');
      let refreshMessage;
      if (response.data.message === 'jwt expired') {
        refreshMessage = await fetchFromApi('/api/v1/users/get_access_token', {refresh_token: refreshToken});
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

  function loadUser() {
    if (!localStorage.getItem('accessToken')) {
      return 1;
    }
    try {
      handleFetchUser().then(response => {setUserdata(response.data.user)})
    }
    catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    loadUser();
  }, [])


  return (
    <PageComponent>
      <div className='bg-white dark:bg-neutral-700 min-h-screen md:w-10/12 lg:w-8/12 mx-auto shadow-2xl p-3'>
        <h1 className='text-2xl font-bold'>Personal profile of {userdata.login}</h1>
        <div>
          <p>Your nickname: {userdata.nickname}</p>
          <p>Your email: {userdata.email}</p>
          <Image alt='profile picture'></Image>
        </div>
        Your articles: {userdata.articles}
        <button onClick={loadUser}>load user</button>
      </div>
    </PageComponent>
  )
}
