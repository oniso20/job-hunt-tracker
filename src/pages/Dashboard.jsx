import React from "react";

// React router imports
import { useLoaderData } from "react-router-dom";

// Helper functions
import { fetchData } from "../helpers";

// loader
export const dashboardLoader = () => {
  const userName = fetchData("userName");
  return {
    userName,
  };
};

const Dashboard = () => {
  const { userName } = useLoaderData();
  return (
    <div>
      <h5>{userName}</h5>
      <h3>Dashboard</h3>
    </div>
  );
};

export default Dashboard;
