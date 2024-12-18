import React, { useState, Suspense } from "react";

import Head from "next/head";
import Navbar from "@/components/spalike/Navbar";
import FooterComponent from "@/components/spalike/FooterComponent";
import PopUpMessage from "@/components/ui/popups/PopUpMessage";

import "@/app/globals.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const ArticleWrite = React.lazy(
  () => import("@/components/views/ArticleWrite"),
);
const Profile = React.lazy(() => import("@/components/views/Profile"));
const Login = React.lazy(() => import("@/components/views/Login"));
const ArticleBrowser = React.lazy(
  () => import("@/components/views/ArticleBrowser"),
);
const AdminDashboard = React.lazy(
  () => import("@/components/views/AdminDashboard"),
);

function LoadingPlaceholder() {
  return <div className="items-center justify-center">Loading</div>;
}

export default function App() {
  const [messages, setMessages] = useState(
    Array<{ id: Number; content: String }>,
  );
  const [messageCount, setMessageCount] = useState(Number);

  function addMessage(message: String) {
    setMessageCount(messageCount + 1);
    setMessages([...messages, { id: messageCount, content: message }]);
  }
  function removeMessage(id: Number) {
    setMessages(
      messages.filter((message) => {
        return message.id != id;
      }),
    );
  }

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 dark:text-white font-roboto">
      <Head>
        <title>KUST HEIGHTS APP</title>
        <link rel="preconnect">localhost:5000</link>
        <meta name="description">Kust heights SPA page</meta>
      </Head>
      <div className="fixed text-white w-fit h-fit bottom-4 left-4 rounded-sm">
        <ul>
          {messages.map((message) => {
            return (
              <li key={message.id.toString()}>
                <PopUpMessage remove={removeMessage} message={message} />
              </li>
            );
          })}
        </ul>
      </div>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <div>
            <Routes>
              <Route
                path="/app/browse"
                element={
                  <Suspense fallback={<LoadingPlaceholder />}>
                    <ArticleBrowser />
                  </Suspense>
                }
              />
              <Route
                path="/app/article/write"
                element={
                  <Suspense fallback={<LoadingPlaceholder />}>
                    <ArticleWrite className="bg-white dark:bg-neutral-800" />
                  </Suspense>
                }
              />
              <Route
                path="/app/login"
                element={
                  <Suspense fallback={<LoadingPlaceholder />}>
                    <Login />
                  </Suspense>
                }
              />
              <Route
                path="/app/profile"
                element={
                  <Suspense fallback={<LoadingPlaceholder />}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route
                path="/app/admin"
                element={
                  <Suspense fallback={<LoadingPlaceholder />}>
                    <AdminDashboard addMessage={addMessage} />
                  </Suspense>
                }
              />
            </Routes>
          </div>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}
