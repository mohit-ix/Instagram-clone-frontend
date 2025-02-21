import { NavLink } from "react-router-dom";
import "./SearchCard.css";

export default function SearchCard({user, search}) {
  const toLink = search ? `/profile/${user._id}` : `/direct/t/${user._id}`;
  return (
    <NavLink style={{textDecoration: "none"}} to={toLink}><div className="user-card">
      <div className="full-card">
        <div className="image-section">
          <img className="search-image-section" src={user.profilePicture}/>
        </div>
        <div className="card-name-wrap">
          <div className="card-username-wrap">{user.username}</div>
          <div className="card-fullname-wrap">{user.fullname}</div>
        </div>
      </div>
    </div></NavLink>
  );
}
