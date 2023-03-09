import React from "react";

// React router imports
import { useLoaderData } from "react-router-dom";

// Library imports
import { toast } from "react-toastify";

// Components
import Intro from "../components/Intro";
import AddJobTitle from "../components/AddJobTitle";

// import Helper functions
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
  const budgets = fetchData("budget");
  return {
    userName,
    budgets,
  };
};

const Dashboard = () => {
  const { userName, budgets } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets ? <p></p> : <p></p>}
            <div className="grid-lg">
              <div className="flex-lg">
                <AddJobTitle />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
