import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUser } from "@fortawesome/free-solid-svg-icons";

const SmartBotChatBox = ({ chat }) => {
  return (
    <>
      <div
        className="w-100 p-2 rounded mb-2  shadow-sm d-flex  align-items-center gap-3"
        style={{ backgroundColor: "#D5E0F1", color: "#384B70" }}
      >
        <FontAwesomeIcon
          icon={faUser}
          className="p-1  rounded-pill p-2"
          style={{
            color: "#384B70",
            backgroundColor: "#A7BBDC",
            fontSize: "0.8em",
            width: "15px",
            height: "15px",
          }}
        />
        <div className="d-flex flex-wrap">{chat.message}</div>
      </div>
      <div
        className="w-100 p-2 rounded shadow-sm d-flex align-items-center  gap-3"
        style={{}}
      >
        <FontAwesomeIcon
          icon={faComment}
          className="p-1  rounded-pill p-2"
          style={{
            color: "white",
            backgroundColor: "#384B70",
            fontSize: "0.8em",
            width: "15px",
            height: "15px",
          }}
        />
        <div className="d-flex flex-wrap">{chat.reply}</div>
      </div>
    </>
  );
};

export default SmartBotChatBox;
