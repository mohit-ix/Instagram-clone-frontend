import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Message from "./Message";
import socket from "../utils/socket";
import "./Chat.css";

export default function Chat({ userId }) {
  const user = useSelector((state) => state.userReducer.user); //contains the value of user
  const accessToken = useSelector((state) => state.userReducer.accessToken); //contains the access token of the user
  const [conversations, setConversations] = useState([]); //contains the list of all users

  //function to sent the message on enter
  async function submitHandler(event) {
    if (event.key === "Enter") {
      const message = event.target.value;
      const data = {
        fromUserId: user._id,
        message: message,
        toUserId: userId,
      };
      socket.emit("add-message", data);
      setConversations((prev) => [...prev, data]);
      event.target.value = "";
    }
  }

  //update the messages on opening a chat
  useEffect(() => {
    async function getMessages() {
      const result = await axios.get(`http://localhost:8000/chat/api/get-chat/${userId}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      if(result.status === 200) {
        const conversation = result.data.conversation;
        setConversations(conversation);
      }
    }
    if(accessToken !== null) {
      getMessages();
    }
  }, [userId, accessToken]);

  //updates the conversation on incoming message
  useEffect(() => {
    function addIncomingConversation(data) {
      if(data.fromUserId === userId) {
        setConversations((prev) => [...prev, data]);
      }
      
    }

    socket.on("add-message-response", addIncomingConversation);
  }, []);

  return (
    <div className="chat-wrap">
      <div className="chat-messages">
        {conversations.map((conversation, index) => {
          return <Message
            key={index}
            message={conversation.message}
            own={conversation.fromUserId === user._id}
          />;
        })}
      </div>
      <div className="chatInput-wrap">
        <input
          className="chatInput"
          placeholder="Message..."
          onKeyDown={submitHandler}
        />
      </div>
    </div>
  );
}
