import "./App.css";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebarComponent/Sidebar";
import Chat from "./chatComponent/Chat";
import Pusher from "pusher-js";
import axios from "axios";
import { API } from "./backend";

const baseURL = API;

function App() {
  const [messages, setMessages] = useState([]);

  // get messages from backend
  useEffect(() => {
    axios.get(`${baseURL}messages/sync`).then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    // it will run only once
    const pusher = new Pusher("cda07d01e6670a1346ad", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.subscribe();
    };
  }, [messages]);

  // console.log(messages);

  return (
    <div className="App">
      <div className="app_body">
        {/* sidebar component */}
        <Sidebar />

        {/* chat component */}
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
