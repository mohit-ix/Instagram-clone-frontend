import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Sidebar from "../SideBar";
import LightButton from "../UI/LightButton";
import BlueButton from "../UI/BlueButton";
import "./Profile.css";
import { userActions } from "../../store/user-slice";
import { uiActions } from "../../store/ui-slice";
import EditProfile from "../EditProfile";

export default function Profile() {
  const params = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    _id: "",
    username: "",
    description: "",
    following: [],
    followers: [],
  }); //contains the user details that will be requested from backend
  const [posts, setPosts] = useState([]); //contain all posts for user
  const [hasFollowed, setHasFollowed] = useState(false); //check if the user is already followed or not
  const currentUser = useSelector((state) => state.userReducer.user); //contains the info of loggedin user
  const accessToken = useSelector((state) => state.userReducer.accessToken); //contains the accessPoint
  const userId = params.userId; //user id of the user of profile page

  //this will get all the user info and posts after rendering
  useEffect(() => {
    async function getInfo() {
      const userInfo = await axios(
        `http://localhost:8000/user/api/admin/get-user/${userId}`
      );
      setUser(userInfo.data.user);

      const postInfo = await axios(
        `http://localhost:8000/post/api/get-userPosts/${userId}`
      );
      setPosts(postInfo.data.posts);
    }

    getInfo();
  }, [userId, hasFollowed]);

  //this will update the follow button after rendering
  useEffect(() => {
    if (currentUser?.following.includes(userId)) {
      setHasFollowed(true);
    }
  }, [hasFollowed, user]);

  //this will update the sidebar active button after rendering
  useEffect(() => {
    if (currentUser?._id === userId) {
      dispatch(uiActions.updateActive(6));
    }
  }, [currentUser]);

  //function to send the follow request
  async function handleFollow() {
    try {
      const result = await axios.put(
        `http://localhost:8000/user/api/admin/follow/${userId}`,
        {},
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
      );

      if (result.status === 200) {
        dispatch(userActions.follow({ userId }));
        setHasFollowed(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //function to send the unfollow request
  async function handleUnfollow() {
    try {
      const result = await axios.put(
        `http://localhost:8000/user/api/admin/unfollow/${userId}`,
        {},
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
      );

      if (result.status === 200) {
        dispatch(userActions.unfollow({ userId }));
        setHasFollowed(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //function to show Edit Profile modal
  function handleEditProfile() {
    dispatch(uiActions.showEditProfile());
  }

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="profile-page">
        <EditProfile />
        <div className="profile-page-wrap">
          <div className="profile-info">
            <section className="pp-wrap">
              <img className="profile-picture" src={user.profilePicture} />
            </section>
            <section className="username-wrap">
              <span className="username-text">{user.username}</span>
              {currentUser?._id === userId ? (
                <LightButton onClick={handleEditProfile}>
                  Edit Profile
                </LightButton>
              ) : hasFollowed ? (
                <LightButton onClick={handleUnfollow}>Following</LightButton>
              ) : (
                <BlueButton onClick={handleFollow}>Follow</BlueButton>
              )}
            </section>
            <section className="info-wrap">
              <span className="info-text">{posts.length}</span> posts{" "}
              <span className="info-text second">{user.followers.length}</span>{" "}
              followers{" "}
              <span className="info-text second">{user.following.length}</span>{" "}
              following
            </section>
            <section className="description-wrap">
              <div className="full-description">
                <span className="desc-fullname">{user.fullname}</span>
                <span className="desc-description">{user.description}</span>
              </div>
            </section>
            <section></section>
          </div>
          <div className="profile-post-wrap">
            {posts.map((post) => {
              return (
                <div key={post._id} className="posts-collection">
                  <div className="profile-Post">
                    <img className="profile-post-img" src={post.imageUrl} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
