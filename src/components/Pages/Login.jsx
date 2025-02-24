import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { userActions } from "../../store/user-slice";
import "./Login.css";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showImg, setShowImg] = useState(1); //represents the change of images to be displayed on the login page
  const [loginError, setLoginError] = useState(false);
  const [username, setUsername] = useState(""); //contains username
  const [password, setPassword] = useState(""); //contains password

  //function to sumbit user details for authentication
  async function submitHandler(value, actions) {
    // e.preventDefault();
    try {
      // const data = { username, password };
      console.log(value);
      const result = await axios.post(
        "http://localhost:8000/user/api/auth/login",
        value
      );
      if (result.status === 200) {
        const { status, message, data, accessToken } = result.data;
        dispatch(userActions.login({ user: data, accessToken }));
        navigate("/");
      }
    } catch (err) {
      if (err.status === 401) {
        setLoginError(true);
      }
    }
  }

  // will change the showImg value to change the image after every 3 seconds;
  useEffect(() => {
    const interval = setInterval(() => {
      if (showImg < 4) {
        setShowImg(showImg + 1);
      } else {
        setShowImg(1);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [showImg]);

  return (
    <div className="login-screen">
      <div className="login-wrapper">
        <div className="left-side">
          <div className="front-img-wrapper">
            <img
              className={showImg == 1 ? "front-img show" : "front-img hide"}
              src="http://localhost:3000/images/loginpage1.png"
            />
            <img
              className={showImg == 2 ? "front-img show" : "front-img hide"}
              src="http://localhost:3000/images/loginpage2.png"
            />
            <img
              className={showImg == 3 ? "front-img show" : "front-img hide"}
              src="http://localhost:3000/images/loginpage3.png"
            />
            <img
              className={showImg == 4 ? "front-img show" : "front-img hide"}
              src="http://localhost:3000/images/loginpage4.png"
            />
          </div>
        </div>
        <div className="right-login-side">
          <div className="right-login-wrapper">
            <div className="instagram-logo"></div>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={submitHandler}
            >
              {({ errors, touched, isSubmitting, isValid, dirty }) => (
                <Form className="login-form">
                  <Field
                    className="login-input"
                    name="username"
                    placeholder="E-mail"
                  />
                  <Field
                    className="login-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <button
                    disabled={isSubmitting || !(isValid && dirty)}
                    type="submit"
                    className="login-button"
                  >
                    Log in
                  </button>
                  {loginError && (
                    <div className="login-error">
                      Sorry, your password was incorrect. Please double-check
                      your password.
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
          <div className="signup">
            <span>Don't have an account?</span>
            <span className="signup-text" onClick={() => navigate("/signup")}>
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
