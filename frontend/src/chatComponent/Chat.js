import React, { useState } from "react";
import "./Chat.css";
import ChatHeader from "./chatHeader/ChatHeader";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import axios from "axios";
import { API } from "../backend";

function Chat(props) {
  const { messages } = props;
  const baseURL = API;
  // console.log(messages);

  const [input, setInput] = useState("");

  // send message to backend from frontend
  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post(`${baseURL}messages/new`, {
      message: input,
      name: "DEMO APP",
      timestamp: Date.now(),
      received: "false",
    });

    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader />

      {/* chat body */}
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${message.received && "chat_reciever"}`}
            key={Math.random()}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {/* {new Date().toUTCString()} */}
              {/* {new Date().toLocaleString()} */}
              {new Date(message.timestamp).toLocaleString()}
            </span>
          </p>
        ))}
      </div>

      {/* chat footer */}
      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button
            onClick={sendMessage}
            type="submit"
            style={{ display: "none" }}
          >
            Send a message
          </button>
          <IconButton onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
