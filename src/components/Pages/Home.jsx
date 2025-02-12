import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";
import { uiActions } from "../../store/ui-slice";
import SideBar from "../SideBar";
import Feed from "../Feed";

import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]); //contains all posts
  const dispatch = useDispatch(); //for dispatching all user redux functions
  const user = useSelector((state) => state.userReducer.user); //contains the state of user
  const accessToken = useSelector((state) => state.userReducer.accessToken); //contains the accessToken
  
  //get all the posts and activate the sidebar "home" after rendering
  useEffect(() => {
    dispatch(uiActions.updateActive(1));
    if(user) {
      async function getPosts() {
        const result = await axios.get(`http://localhost:8000/get-home`, {
          headers: { Authorization: "Bearer " + accessToken },
        });
        setPosts(result.data.posts);
      }

      getPosts();
    }
    
  }, [user]);

  return (
    <>
      {!user && (
        <center>
          <SpinnerDotted />
        </center>
      )}
      {user && (
        <div className="home-wrap">
          <div className="sidebar">
            <SideBar />
          </div>
          <div className="home">
            <div className="posts-wrap">
              <Feed posts={posts} />
            </div>
            <div className="suggestion-wrap">Left Side</div>
          </div>
        </div>
      )}
    </>
  );
}