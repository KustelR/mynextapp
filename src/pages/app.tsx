import React from 'react';

import Navbar from '@/components/spalike/Navbar';
import FooterComponent from '@/components/spalike/FooterComponent';
import ArticleContainer from '@/components/views/ArticleContainer'
import ArticleBrowser from '@/components/views/ArticleBrowser'
import ArticleWrite from '@/components/views/ArticleWrite';
import Login from '@/components/views/Login';
import Profile from '@/components/views/Profile';

import '../app/globals.css';

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className='bg-neutral-100 dark:bg-neutral-900 dark:text-white'>
        <div className='min-h-screen'>
            <Navbar />
            <div className='mt-4'>
                <Routes>
                <Route path="/app/browse" element={<ArticleBrowser/>} />
                <Route path="/app/article/read" element={<ArticleContainer className="bg-white dark:bg-neutral-800"/>} />
                <Route path="/app/article/write" element={<ArticleWrite className="bg-white dark:bg-neutral-800" /> } />
                <Route path="/app/login" element={<Login /> } />
                <Route path="/app/profile" element={<Profile /> } />
                </Routes>
            </div>
        </div>
        <div>
        <FooterComponent />
        </div>
      </div>
    </Router>
  );
}