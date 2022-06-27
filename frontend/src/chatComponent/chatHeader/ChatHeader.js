import React from "react";
import "./ChatHeader.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";

function ChatHeader() {
  return (
    <div className="chat_header">
      <Avatar />
      <div className="chat_header_info">
        <h3>Room Name</h3>
        <p>Last seen at ...</p>
      </div>
      <div className="chat_header_right">
        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatHeader;
