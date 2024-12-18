"use client";

import React, { useState, useEffect } from "react";
import { ErrorBox, ShowIf, TextButton } from "@/components/ui";
import ArticlePreview from "@/components/articles/ArticlePreview";
import reqAuth from "@/scripts/reqAuth";
import axios from "axios";
import Image from "next/image";
import { Link } from "react-router-dom";

export default function Personal() {
  const [userdata, setUserdata] = useState({});
  const [articles, setArticles] = useState([]);
  const [adminAccess, setAdminAccess] = useState(false);

  async function loadUser() {
    if (!localStorage.getItem("accessToken")) {
      return 1;
    }
    try {
      const response = await reqAuth("/api/v1/users/me");
      setUserdata(response.data);
    } catch (error) {
      alert(error);
    }
  }

  async function loadArticles() {
    try {
      const response = await axios.get("/api/v2/articles/previews", {
        params: { authorLogin: userdata.login },
      });
      console.log(response.data);
      setArticles(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    loadArticles();
    setAdminAccess(localStorage.getItem("admin") === "true");
    console.log(localStorage.getItem("admin"));
  }, [userdata]);

  return (
    <div className="bg-white dark:bg-neutral-800 md:w-10/12 lg:w-8/12 md:max-w-6xl mx-auto shadow-2xl p-3">
      <ShowIf isVisible={!!userdata.errorMessage}>
        <ErrorBox title="Failure" body={userdata.errorMessage} />
      </ShowIf>
      <h2 className="text-2xl font-bold mb-2 border-b-2 border-gray-500 p-2">
        Personal profile of {userdata.login}
      </h2>
      <div className="md:flex justify-between my-2 border-b-2 border-gray-500 p-2">
        <div>
          <p>Your nickname: {userdata.nickname}</p>
          <p>Your email: {userdata.email}</p>
          <p>Registration date: nope</p>
        </div>
        <div className="my-8 md:my-0 w-fit justify-center">
          <div className="flex justify-center">
            <Image
              src="https://sun9-31.userapi.com/impg/oYrL3D_7BRT3mOgV43OYbebkf9GXhF5U6pPsRA/WMhdLR7cGhU.jpg?size=1024x1024&quality=95&sign=34fd47c61d7e51d9681d09fdbe207e02&type=album"
              alt="profile picture"
              height={100}
              width={200}
            />
          </div>
          <TextButton className="w-full mt-2">
            Change profile picture
          </TextButton>
        </div>
      </div>
      <div className="my-2 border-b-2 border-gray-500 p-2">
        <h3 className="text-xl font-semibold">Your articles:</h3>
        <ul>
          <li>
            {articles ? (
              articles.map((article) => {
                return <ArticlePreview key={article._id} article={article} />;
              })
            ) : (
              <span>Write some!</span>
            )}
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Controls</h3>
        <div className="flex">
          <TextButton className="mr-2">Change password</TextButton>
          <TextButton className="mr-2">Change email</TextButton>
          <TextButton className="mr-2">Change nickname</TextButton>
          <TextButton className="ml-auto mr-2">Delete account</TextButton>
          <ShowIf isVisible={adminAccess}>
            <Link to="/app/admin">
              <TextButton>ADMIN</TextButton>
            </Link>
          </ShowIf>
        </div>
      </div>
    </div>
  );
}
