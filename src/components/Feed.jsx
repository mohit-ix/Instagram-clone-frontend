import Post from "./Post";
import "./Feed.css";

export default function Feed({posts}) {
  
  return (
    <div className="feed-wrap">
      {posts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
}
