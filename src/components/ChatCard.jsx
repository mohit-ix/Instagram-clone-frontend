import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./ChatCard.css";


export default function ChatCard({chat}) {
  const showChatId = useSelector((state) => state.ui.showChatId); //contains userId for active chat
  const user = useSelector((state) => state.userReducer.user); //contains information of the user
  const [active, setActive] = useState(false); //contains if current chat is active or not
  const [toUserId, setToUserId] = useState(""); //contains the id of user to which message has to be sent
  
  //update the state of showChatId and user 
  useEffect(() => {
    if(showChatId === chat.toUserId) {
      setActive(true);
    } else {
      setActive(false);
    }
    if(user?._id === chat.toUserId) {
      setToUserId(chat.fromUserId);
    } else {
      setToUserId(chat.toUserId);
    }
  }, [showChatId, user]);

  return (
    <NavLink style={{textDecoration: "none"}} to={`/direct/t/${toUserId}`}>
    <div className={active? `chatCard-wrap active`: "chatCard-wrap"}>
      <img className="chatCard-image" src={chat.profilePicture} />
      <div className="chatCard-info">
        <div className="chatCard-name">{chat.fullname}</div>
        <div style={{"height": "8px"}}></div>
        <div className="chatCard-last">{chat.message}</div>
      </div>
    </div></NavLink>
  );
}
