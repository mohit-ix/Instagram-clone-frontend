import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import axios from "axios";
import { uiActions } from "../../store/ui-slice";
import Chat from "../Chat";
import "./ChatWindow.css";

export default function ChatWindow() {
  const dispatch = useDispatch();
  const params = useParams();
  const [user, setUser] = useState({
    _id: "",
    username: "",
    description: "",
    following: [],
    followers: [],
  }); //contains detail of user
  const userId = params.userId;

  //updates the chatId in the ui slice
  useEffect(() => {
    dispatch(uiActions.updateChatId(userId));
  }, [userId]);

  //request user info of the user and updates the user state
  useEffect(() => {
    async function getInfo() {
      const userInfo = await axios(
        `http://localhost:8000/user/api/admin/get-user/${userId}`
      );
      setUser(() => userInfo.data.user);
    }

    getInfo();
  }, [userId]);
  return (
    <div className="chatWindow-wrap">
      <div className="chatWindow-top">
        <img className="chatWindow-profile" src={user?.profilePicture} />
        <span className="chatWindow-name">{user?.fullname}</span>
      </div>
      <div>
        <Chat userId={userId} />
      </div>
    </div>
  );
}
