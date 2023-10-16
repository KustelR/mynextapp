'use client'


import React, {useState, useEffect} from 'react';
import '../app/globals.css';
import PageComponent from '@/components/spalike/PageComponent'
import axios from 'axios';


async function fetchUser(accessToken) {
  return new Promise(function(resolve, reject) {
    axios.get('/api/v1/users/me', 
      {params: {access_token: accessToken}})
    .then(response => {resolve(response)})
    .catch(err => {reject(err);});
  })
}


export default function Personal() {

  const [userdata, setUserdata] = useState({})

  function loadUser() {
    const accessToken = localStorage.getItem('accessToken');
    fetchUser(accessToken).then(response => {console.log(response.data.user); setUserdata(response.data.user)})
  }


  return (
    <PageComponent>
      <div><h1>{userdata.login}</h1>
      <button onClick={loadUser}>load ser</button></div>
    </PageComponent>
  )
}
