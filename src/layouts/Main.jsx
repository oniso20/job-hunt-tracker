import React from "react";

// React router imports
import { Outlet } from "react-router-dom";

// Helper functions
import { fetchData } from "../helpers";

// Assets
import wave from "../assets/wave.svg";

// Components
import Nav from "../components/Nav";

// loader
export const mainLoader = () => {
  const userName = fetchData("userName");
  return {
    userName,
  };
};

const Main = () => {
  return (
    <div className="layout">
      <Nav />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};

export default Main;
