import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  //function to send the user details to create new user
  async function submitHandler(e) {
    e.preventDefault();
    try {
      const data = { email, username, fullname, password };
      const result = await axios.post(
        "http://localhost:8000/user/api/auth/signup",
        data
      );
      if (result.status == 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="signup-wrapper">
      <div className="right-side">
        <div className="right-wrapper">
          <div className="instagram-logo"></div>
          <form className="signup-form" onSubmit={submitHandler}>
            <input
              className="signup-input"
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="signup-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              className="signup-input"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
            />
            <input
              className="signup-input"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <button className="signup-button">Sign up</button>
          </form>
        </div>

        <div className="login">
          <span>Have an account? </span>
          <span className="login-text" onClick={() => navigate("/login")}>
            Log in
          </span>
        </div>
      </div>
    </div>
  );
}
