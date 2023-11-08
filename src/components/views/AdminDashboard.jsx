import React, { useState, Suspense } from "react";
import ShowIf from "../ui/ShowIf";

import DetailedData from "@/components/DetailedData";
const UserTable = React.lazy(() => import("@/components/UserTable"));
const ArticleTable = React.lazy(() => import("@/components/ArticleTable"));

const options = ["Users", "Articles"];

export default function AdminDashboard(props) {
  const { addMessage } = props;
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedItem, setSelectedItem] = useState({});

  return (
    <div className="md:flex p-5 h-full justify-between">
      <div className="dark:border-b dark:border-x dark:text-neutral-200 border-t-4 dark:border-neutral-700 border-t-secondary-light bg-white max-h-[460px] overflow-scroll md:overflow-x-hidden dark:bg-neutral-800 md:w-9/12 p-1 md:mr-5 mb-5 md:mb-0">
        <ul className="flex mb-1">
          {options.map((option) => {
            return (
              <li key={option} className="mr-1">
                <button
                  className="hover:bg-opacity-25 hover:bg-black"
                  onClick={() => {
                    setSelectedTable(option);
                  }}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
        <ShowIf isVisible={selectedTable === "Users"}>
          <Suspense>
            <UserTable addMessage={addMessage} />
          </Suspense>
        </ShowIf>
        <ShowIf isVisible={selectedTable === "Articles"}>
          <Suspense>
            <ArticleTable
              addMessage={addMessage}
              onRowSelect={setSelectedItem}
            />
          </Suspense>
        </ShowIf>
      </div>
      <div className="md:w-3/12">
        <DetailedData
          className="dark:border-b dark:border-x border-t-4 dark:border-neutral-700 border-t-secondary-light bg-white dark:bg-neutral-800"
          toDisplay={selectedItem}
        />
      </div>

    </div>
  );
}
