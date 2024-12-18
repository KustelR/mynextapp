import React from "react";

export default function PendingBox({ title, body }) {
  return (
    <div className="my-4 px-4 border-l-4 border-cyan-500 bg-slate-200 dark:bg-opacity-20">
      <h3 className="font-bold">{title}</h3>
      <p>{body}</p>
    </div>
  );
}
