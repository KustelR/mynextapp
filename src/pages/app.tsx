import React, {useState} from 'react';

import Head from 'next/head'
import Navbar from '@/components/spalike/Navbar';
import FooterComponent from '@/components/spalike/FooterComponent';
import PopUpMessage from '@/components/ui/popups/PopUpMessage';
import ArticleBrowser from '@/components/views/ArticleBrowser';
import Profile from '@/components/views/Profile';
import ArticleWrite from '@/components/views/ArticleWrite';
import Login from '@/components/views/Login';

import '../app/globals.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';





export default function App() {

  const [messages, setMessages] = useState(Array<{id: Number, content: String}>)
  const [messageCount, setMessageCount] = useState(Number)

  function addMessage(message: String) {
    setMessageCount(messageCount + 1);
    setMessages([...messages, {id: messageCount, content: message}]);
  }
  function removeMessage(id: Number) {
    setMessages(messages.filter(message => {return message.id != id}));
  }

  return (
    <div className='bg-neutral-100 dark:bg-neutral-900 dark:text-white font-roboto'>
      <Head>
        <title>KUST HEIGHTS APP</title>
        <link rel="preconnect">localhost:5000</link>
        <meta name='description'>Kust heights SPA page</meta>
       
      </Head>
      <div className='fixed text-white w-fit h-fit bottom-4 left-4 rounded-sm'>
        <ul>
            {messages.map((message) => {
              return <li key={message.id.toString()}><PopUpMessage remove={removeMessage} message={message}/></li>
            })}
        </ul>
      </div>
        <Router>
        <div className='min-h-screen'>
            <Navbar />
            <div className='mt-4'>
                <Routes>
                  <Route path="/app/browse" element={<ArticleBrowser/>} />
                  <Route path="/app/article/write"  element={<ArticleWrite className="bg-white dark:bg-neutral-800" />} />
                  <Route path="/app/login" element={<Login />} />
                  <Route path="/app/profile" element={<Profile />} />
                </Routes>
            </div>
        </div>
        <FooterComponent />
        </Router>
    </div>
  );
}