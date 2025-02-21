import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import RootLayout from "./components/Pages/RootLayout";
import MessageLayout from "./components/Pages/MessageLayout";
import NewChat from "./components/Pages/NewChat";

import { checkAuthLoader, tokenLoader } from "./utils/auth";
import { userActions } from "./store/user-slice";
import socket from "./utils/socket";
import "./App.css";
import ChatWindow from "./components/Pages/ChatWindow";

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
      {
        path: "direct",
        element: <MessageLayout />,
        loader: checkAuthLoader,
        children: [
          { index: true, element: <NewChat /> },
          { path: "t/:userId", element: <ChatWindow /> },
        ],
      },
    ],
  },
]);

function App() {
  // const socket = socketIO.connect("http://localhost:8000")
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
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

  useEffect(() => {
    if (user !== null) {
      socket.emit("login", user.username);
    }
  }, [user]);

  return <RouterProvider router={router} />;
}

export default App;
