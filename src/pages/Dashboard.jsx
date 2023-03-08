import React from "react";

// React router imports
import { useLoaderData } from "react-router-dom";

// Library imports
import { toast } from "react-toastify";

// Components
import Intro from "../components/Intro";

// Helper functions
import { fetchData } from "../helpers";

// Action function
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    localStorage.setItem("userName", JSON.stringify(formData.userName));

    return toast.success(`Welcome ${formData.userName}`);
  } catch (err) {
    throw new Error("There was an error creating your account.");
  }
}

// Data loader function
export const dashboardLoader = () => {
  const userName = fetchData("userName");
  return {
    userName,
  };
};

const Dashboard = () => {
  const { userName } = useLoaderData();
  return <div>{userName ? <p>{userName}</p> : <Intro />}</div>;
};

export default Dashboard;
