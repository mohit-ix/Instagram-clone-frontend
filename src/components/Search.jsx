import { useState } from "react";
import axios from "axios";

import SearchCard from "./SearchCard";
import "./Search.css";

export default function Search() {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");

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

  return (
    <div className="search-box">
      <div className="search-text">Search</div>
      <div className="search-IR">
        <div className="search-components">
          <input
            className="search-input"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
          <div className="search-result-wrap">
            <div className="search-result">
              <div className="recent-text">Result</div>
              <div className="result-user-list-wrap">
                <ul className="result-user-list">
                  {result.map((user) => {
                    return (
                      <li key={user._id} className="user-item">
                        <SearchCard user={user} search />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
