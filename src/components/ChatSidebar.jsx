import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

import socket from "../utils/socket";
import { uiActions } from "../store/ui-slice";
import ChatCard from "./ChatCard";

import "./ChatSidebar.css";


export default function ChatSidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user); //contains the user information
  const accessToken = useSelector((state) => state.userReducer.accessToken); //contains the accessToken
  const [chatList, setChatList] = useState([]); //contains the chat list

  //function to open the new chat modal
  function openNewChat() {
    dispatch(uiActions.showNewChat());
  }

  //requests the chat list and updates state when loading page
  useEffect(() => {
    async function getChatList() {
      const result = await axios.get("http://localhost:8000/getChatList", {
        headers: {Authorization: "Bearer " + accessToken}
      });
      const chatList = result.data.chatList;
      setChatList(chatList);
    }
    if(accessToken !== null) {
      getChatList();
    }
  }, [accessToken]);

  //requests the chat list and updates state of outgoing and incoming message
  useEffect(() => {
    function addChatList(data) {
      setChatList((prev) => {
        const index = prev.findIndex((chat) => {
          let fromUserId;
          if(chat.toUserId === user?._id) {
            fromUserId = chat.fromUserId;
          } else {
            fromUserId = chat.toUserId;
          }
          return fromUserId === data.fromUserId;
        });

        if(index > -1) {
          // prev[index].message = data.message;
          prev.splice(index, 1);
          return [data, ...prev];
        } else {
          return [data, ...prev];
        }
      });
    }

    function addUserChatList(data) {
      setChatList((prev) => {
        console.log(prev);
        const index = prev.findIndex((chat) => {
          let toUserId;
          if(chat.toUserId === user?._id) {
            toUserId = chat.fromUserId;
          } else {
            toUserId = chat.toUserId;
          }
          return toUserId === data.toUserId;
        });
        console.log(index);

        if(index > -1) {
          // prev[index].message = data.message;
          prev.splice(index, 1);
          console.log(prev);
          return [data, ...prev];
        } else {
          return [data, ...prev];
        }
      });
    }

    socket.on("add-chatList", addChatList);
    socket.on("add-userChatList", addUserChatList);
  }, [user]);
  
  return (
    <div className="messages-wrap">
      <div className="messages-sidewrap">
        <div className="messages-topwrap">
          <span className="messages-username">{user?.username}</span>
          <img
            className="newChat-icon"
            src="http://localhost:3000/images/newChat.png"
            onClick={openNewChat}
          />
        </div>
        <div className="messages-bottomwrap">
          <div className="messages-headline">Messages</div>
          <div className="chats">
            {chatList.map((chat, index) => (
              <ChatCard key={chat._id} chat={chat}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
