import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { uiActions } from "../store/ui-slice";

import Modal from "./UI/Modal";
import SearchCard from "./SearchCard";

import "./StartNewChat.css";

export default function StartNewChat() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.ui.showModal); // contains the value of modal
  const [result, setResult] = useState([]); //contains the result of search
  const [search, setSearch] = useState(""); //contains the value of search

  //function to send search query after every change if the query is more than 1
  async function handleSearch(e) {
    try {
      const value = e.target.value;
      setSearch(value);
      if (search.length > 1) {
        const usersInfo = await axios.get(
          `http://localhost:8000/user/api/admin/search-users/${search}`
        );
        if (usersInfo.status === 200) {
          setResult(usersInfo.data.users);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const closeModal = () => {
    dispatch(uiActions.hideNewChat());
  };
  return (
    <Modal
      open={showModal === "new-chat"}
      onClose={showModal === "new-chat" ? closeModal : null}
      className="newChat-modal"
    >
      <div className="newChat-modalwrap">
        <div className="newChat-headingwrap">
          <div className="newChat-heading">New message</div>
          <div>X</div>
        </div>
        <div className="newChat-inputwrap">
          To:{" "}
          <input
            className="newChat-input"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="newChat-list">
          {result.map((user) => {
            return (
              <div key={user._id} className="user-item" onClick={closeModal}>
                <SearchCard user={user} />
              </div>
            );
          })}
        </div>
        {/* <button className="newChat-button">Chat</button> */}
      </div>
    </Modal>
  );
}
