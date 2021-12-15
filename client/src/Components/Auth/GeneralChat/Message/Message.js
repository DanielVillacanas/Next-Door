import React from "react";
import "./Message.css";

function Message(props) {
  return (
    <div className={props.own ? "message own" : "message"}>
      <div className="messageTop my-1 ">
        {props.own !== true && (
          <span className="inline-block relative">
            <img
              className="h-10 w-10 rounded-full border-2 border-black"
              src={props.userFromFather?.img_url}
              alt=""
            />
          </span>
        )}

        <p className="messageText rounded-3xl py-4 px-6 max-w-md ml-4">
          {props.message.text}
        </p>
      </div>
    </div>
  );
}

export default Message;
