import React, { useState } from "react";
import Sidebar from "./SideBar/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatHome from "./ChatHome/ChatHome";

export const Chat = () => {
  const [isSidebarClicked, setSidebarClicked] = useState(false);

  const handleSidebarClick = () => {
    setSidebarClicked(!isSidebarClicked);
  };
  return (
    <div className={` ${isSidebarClicked ? "icon-clicked" : ""}`}>
      {/* <BrowserRouter> */}
        <Sidebar
          isIconClicked={isSidebarClicked}
          onIconClick={handleSidebarClick}
        />
        <Routes>
          <Route
            path="/"
            element={<ChatHome isIconClicked={isSidebarClicked} />}
          />
          {/* <Route
            path="/discover"
            element={<Discover isIconClicked={isSidebarClicked} />}
          />
          <Route
            path="library"
            element={<Library isIconClicked={isSidebarClicked} />}
          /> */}
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
};
