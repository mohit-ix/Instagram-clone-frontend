import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";
import ChatSidebar from "../ChatSideBar";

import { uiActions } from "../../store/ui-slice";
import StartNewChat from "../StartNewChat";

export default function MessageLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.updateActive(3));
  }, []);

  return (
    <>
      <SideBar />
      <ChatSidebar />
      <StartNewChat />
      <div>
        <Outlet />
      </div>
    </>
  );
}
