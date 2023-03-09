import React from "react";

// React router imports
import { useLoaderData } from "react-router-dom";

// Library imports
import { toast } from "react-toastify";

// Components
import Intro from "../components/Intro";
import AddJobTitle from "../components/AddJobTitle";

// import Helper functions
import { createNewRole, fetchData, waait } from "../helpers";

// Data loader function
export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budget");
  return {
    userName,
    budgets,
  };
};

// Action function
export async function dashboardAction({ request }) {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));

      return toast.success(`Welcome ${values.userName}`);
    } catch (err) {
      throw new Error("There was an error creating your account.");
    }
  }

  // New role submission
  if (_action === "createNewRole") {
    try {
      createNewRole({
        name: values.newJobTitle,
        amount: values.targetAmount,
      });
      return toast.success("Role created!");
    } catch (e) {
      throw new Error("There was a problem creating your new job title.");
    }
  }
}

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
