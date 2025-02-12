import { NavLink } from "react-router-dom";
import "./SearchCard.css";

export default function SearchCard({user}) {
  return (
    <NavLink style={{textDecoration: "none"}} to={`/profile/${user._id}`}><a className="user-card">
      <div class="full-card">
        <div className="image-section">
          <img className="search-image-section" src="http://localhost:3000/images/defaultavatar.png"/>
        </div>
        <div className="card-name-wrap">
          <div className="card-username-wrap">{user.username}</div>
          <div className="card-fullname-wrap">{user.fullname}</div>
        </div>
      </div>
    </a></NavLink>
  );
}
