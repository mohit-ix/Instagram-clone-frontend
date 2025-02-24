import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Signup.css";

//minimum 6 characters, 1 uppercase, 1 lowercase and 1 digit
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email address.").required("Required!"),
  password: Yup.string()
    .min(6, "Create a password at least 6 characters long.")
    .matches(passwordRules, { message: "weak password" })
    .required("Required"),
  fullname: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
});

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  //function to send the user details to create new user
  async function submitHandler(value, actions) {
    // e.preventDefault();
    try {
      // const data = { email, username, fullname, password };
      const result = await axios.post(
        "http://localhost:8000/user/api/auth/signup",
        value
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
          <Formik
            initialValues={{
              email: "",
              password: "",
              fullname: "",
              username: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={submitHandler}
          >
            {({ errors, touched, isSubmitted, isValid, dirty }) => (
              <Form className="signup-form">
                <Field
                  className={
                    errors.email && touched.email
                      ? "signup-input error"
                      : "signup-input"
                  }
                  name="email"
                  placeholder="E-mail"
                />
                {errors.email && touched.email ? (
                  <div className="input-error">{errors.email}</div>
                ) : null}
                <Field
                  className={
                    errors.password && touched.password
                      ? "signup-input error"
                      : "signup-input"
                  }
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                {errors.password && touched.password ? (
                  <div className="input-error">{errors.password}</div>
                ) : null}
                <Field
                  className={
                    errors.fullname && touched.fullname
                      ? "signup-input error"
                      : "signup-input"
                  }
                  name="fullname"
                  placeholder="Full Name"
                />
                {errors.fullname && touched.fullname ? (
                  <div className="input-error">{errors.fullname}</div>
                ) : null}
                <Field
                  className={
                    errors.username && touched.username
                      ? "signup-input error"
                      : "signup-input"
                  }
                  name="username"
                  placeholder="Username"
                />
                {errors.username && touched.username ? (
                  <div className="input-error">{errors.username}</div>
                ) : null}
                <button disabled={!(isValid && dirty)} className="signup-button" type="submit">Sign up</button>
              </Form>
            )}
          </Formik>
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
