import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { uiActions } from "../store/ui-slice";
import Search from "./Search";
import UploadImage from "./UploadImage";
import "./SideBar.css";

export default function SideBar() {
  const showActive = useSelector((state) => state.ui.showActive);
  const showSearch = useSelector((state) => state.ui.showSearch);
  const minimize = useSelector((state) => state.ui.minimize);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const userId = user?._id;
  const navigate = useNavigate();
  const spanClass = minimize ? "span-mobile search-active" : "span-mobile";

  //function to logout user
  async function handleLogout() {
    await axios.get("http://localhost:8000/user/api/auth/logout");
    localStorage.removeItem("accessToken");
    navigate("/login");
  }

  //function to navigate to home
  function handleHome() {
    dispatch(uiActions.updateActive(1));
    navigate("/");
  }

  //function to navigate to user profile
  function handleProfile() {
    dispatch(uiActions.updateActive(6));
    navigate(`/profile/${userId}`);
  }

  //function to open modal for image upload
  function handleUploadImage() {
    dispatch(uiActions.showUploadImage());
    dispatch(uiActions.updateActive(5));
  }

  //function to open the search menu
  function handleSearch() {
    dispatch(uiActions.updateSearch(!showSearch));
  }

  function handleMessages() {
    dispatch(uiActions.updateActive(3));
    navigate("/direct");
  }

  useEffect(() => {
    if(showSearch || showActive == 3) {
      dispatch(uiActions.minimizeSidebar(true));
    }
  }, [showSearch, showActive]);

  //this will be activated when clicked on anywhere else sidebar to close search menu
  // useEffect(() => {
  //   document.addEventListener("click", (event) => {
  //     console.log(event.composedPath());
  //     const sideBar = document.getElementsByClassName("sidebar");
  //     const includeSidebar = event.composedPath().includes(sideBar[0]);
  //     if (!includeSidebar) {
  //       console.log("component");
  //       dispatch(uiActions.updateSearch(false));
  //     }
  //   });
  // }, []);

  return (
    <>
      <aside
        className={minimize ? "sidebar-nav search-active" : "sidebar-nav"}
      >
        <UploadImage />
        <div className="sidebar-wrap">
          <div className={minimize ? "nav-logo search-active" : "nav-logo"}>
            <a onClick={handleHome}>
              <img src="http://localhost:3000/svg/instagram-text.svg" />
            </a>
          </div>
          <ul className="top-nav">
            <li className="nav-li" onClick={handleHome}>
              <a className={showActive == 1 ? "nav-items active" : "nav-items"}>
                <img src="http://localhost:3000/svg/home.svg" />
                <span className={spanClass}>Home</span>
              </a>
            </li>
            <li className="nav-li mobile" onClick={handleSearch}>
              <a
                className={
                  showActive == 2
                    ? "nav-items mobile active"
                    : "nav-items mobile"
                }
              >
                <img src="http://localhost:3000/svg/search.svg" />
                <span className={spanClass}>Search</span>
              </a>
            </li>
            <li
              className="nav-li"
              onClick={handleMessages}
            >
              <a className={showActive == 3 ? "nav-items active" : "nav-items"}>
                <img src="http://localhost:3000/svg/messages.svg" />
                <span className={spanClass}>Messages</span>
              </a>
            </li>
            <li
              className="nav-li mobile"
              onClick={() => dispatch(uiActions.updateActive(3))}
            >
              <a
                className={
                  showActive == 4
                    ? "nav-items mobile active"
                    : "nav-items mobile"
                }
              >
                <img src="http://localhost:3000/svg/notification.svg" />
                <span className={spanClass}>Notifications</span>
              </a>
            </li>
            <li className="nav-li" onClick={handleUploadImage}>
              <a className={showActive == 5 ? "nav-items active" : "nav-items"}>
                <img src="http://localhost:3000/svg/create.svg" />
                <span className={spanClass}>Create</span>
              </a>
            </li>
            <li className="nav-li" onClick={handleProfile}>
              <a className={showActive == 6 ? "nav-items active" : "nav-items"}>
                <img className="sidebar-profile" src={user?.profilePicture} />
                <span className={spanClass}>Profile</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
      {showSearch && <Search />}
    </>
  );
}
