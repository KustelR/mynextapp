import React from "react";

export default function PopUpMessage(props: {
  remove: Function;
  message: { id: Number; content: String };
}) {
  return (
    <div
      onClick={() => {
        props.remove(props.message.id);
      }}
      className="px-1 mt-1 bg-black bg-opacity-60 rounded-sm"
    >
      {props.message.content}
    </div>
  );
}
