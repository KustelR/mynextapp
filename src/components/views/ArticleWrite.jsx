import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import SendableForm from "@/components/SendableForm";
import {TextButton, CustomInput, CustomTextArea, RichTextEditor} from "@/components/ui";
import { sendFormData } from "@/scripts/forms/sendArticle";
import patchData from "@/scripts/forms/patchArticle";

export default function ArticleWrite({ className }) {
    const [articleBody, setArticleBody] = useState();
    const title = useRef(null);
    const description = useRef(null);
    const tags = useRef(null);
    const [isUpdate, setIsUpdate] = useState(false);

    let searchParams = useSearchParams();
    useEffect(() => {
        async function loadArticle() {
            const article = (await axios.get(`/api/v2/articles/?_id=${id}`))
                .data;
            console.log(article);
            title.current.value = article.title;
            description.current.value = article.description;
            tags.current.value = article.tags.join(", ");
            setIsUpdate(true);
            
            console.log(isUpdate.current)
        }
        const id = searchParams.get("_id");
        if (id) {
            console.log(id);
            loadArticle(id);
        }
    }, [searchParams]);

    return (
        <div
            className={
                "container md:shadow-lg max-w-screen-md mx-auto p-4 " +
                className
            }
        >
            <SendableForm
                href="/api/v2/articles"
                submitHandler={
                    isUpdate === true ? (url, element, callback) => {
                              patchData(
                                  url + `?_id=${searchParams.get("_id")}`,
                                  element,
                                  callback,
                                  {},
                                  {
                                      "x-access-token":
                                          localStorage.getItem("accessToken"),
                                  }
                              );
                          }
                        : (url, element, callback) => {

                              sendFormData(
                                  url,
                                  element,
                                  callback,
                                  { body: articleBody },
                                  {
                                      "x-access-token":
                                          localStorage.getItem("accessToken"),
                                  }
                              );
                          }
                }
            >
                <CustomInput
                    label="Title"
                    id="title"
                    reference={title}
                    placeholder="Your title..."
                    className="mb-4 text-2xl"
                />
                <RichTextEditor
                    className="mb-4 min-h-500px"
                    label="Article body"
                    onChange={(e) => {
                        setArticleBody(e);
                    }}
                />
                <CustomTextArea
                    className="mb-4"
                    label="Short description"
                    reference={description}
                    id="description"
                />
                <CustomInput
                    autoComplete="off"
                    label="Tags"
                    id="tags"
                    reference={tags}
                    placeholder="text"
                    className="mb-4"
                />
                <TextButton>POST ARTICLE</TextButton>
            </SendableForm>
        </div>
    );
}
