import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import RootLayout from "./components/Pages/RootLayout";

import { checkAuthLoader, tokenLoader } from "./utils/auth";
import { userActions } from "./store/user-slice";
import "./App.css";

//defining all the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home />, loader: checkAuthLoader },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        path: "profile/:userId",
        element: <Profile />,
        loader: checkAuthLoader,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const accessToken = JSON.parse(localStorage.getItem("accessToken") || null); //checking if accessToken is stored in local storage

  if (accessToken != null) {
    //get the user details to store in the user redux
    useEffect(() => {
      async function getUser() {
        const result = await axios.get(
          "http://localhost:8000/user/api/admin/get-user",
          {
            headers: { Authorization: "Bearer " + accessToken },
          }
        );
        dispatch(
          userActions.fromStorage({ user: result.data.user, accessToken })
        );
      }

      getUser();
    }, [accessToken]);
  }

  return <RouterProvider router={router} />;
}

export default App;
