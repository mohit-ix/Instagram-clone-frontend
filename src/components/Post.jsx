import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import "./Post.css";
import { NavLink } from "react-router-dom";

export default function Post({ post }) {
  const user = useSelector((state) => state.userReducer.user);
  const accessToken = useSelector((state) => state.userReducer.accessToken);
  const [isLiked, setIsLiked] = useState(false); //contains the value if the post is liked or not
  const [likes, setLikes] = useState(0); //contains the count of total likes

  //function to update the like button on click
  async function handleLike() {
    try {
      const result = await axios.put(
        `http://localhost:8000/post/api/like/${post._id}`,
        {},
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
      );

      if (result.status === 200) {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //this will check if post is liked and update post count after rendering
  useEffect(() => {
    if (post.likes.includes(user._id)) {
      setIsLiked(true);
    }
    setLikes(post.likes.length);
  }, []);

  return (
    <article className="post-wrap">
      <div className="top-part">
        <div>
          <img
            className="profile-wrap"
            src="http://localhost:3000/images/defaultavatar.png"
          />
        </div>
        <div className="username-wrap">
          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to={`/profile/${post.userId}`}
          >
            {post.username}
          </NavLink>
        </div>
      </div>
      <div>
        <img className="post-image" src={post.imageUrl} />
      </div>
      <div className="bottom-part">
        <div className="lc-buttons-wrap">
          {isLiked ? (
            <FaHeart
              onClick={handleLike}
              style={{ color: "red" }}
              className="lc-button"
            />
          ) : (
            <FaRegHeart onClick={handleLike} className="lc-button" />
          )}
          <TbMessageCircle className="lc-button comment" />
        </div>
        <div>{likes} likes</div>
        <div>{post.description}</div>
      </div>
    </article>
  );
}
