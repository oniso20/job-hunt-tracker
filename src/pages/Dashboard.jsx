import React from "react";

// React router imports
import { useLoaderData } from "react-router-dom";

// Library imports
import { toast } from "react-toastify";

// Components
import Intro from "../components/Intro";
import AddJobTitle from "../components/AddJobTitle";
import AddApplicationForm from "../components/AddApplicationForm";
import ApplicationItem from "../components/ApplicationItem";

// import Helper functions
import { createApplication, createNewRole, fetchData, waait } from "../helpers";

// Data loader function
export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const roles = fetchData("roles");
  return {
    userName,
    roles,
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

  // New role creation
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

  // New application submission
  if (_action === "createApplication") {
    try {
      // Create an application
      createApplication({
        name: values.newApplication,
        source: values.sourceLink,
        status: values.status,
        notes: values.notes,
        deadlineDate: values.deadlineDate,
        budgetId: values.matchingRole,
      });
      // Check if deadlineDate has already passed
      const deadlineDate = new Date(values.deadlineDate);
      const today = new Date();
      if (deadlineDate < today) {
        return toast.error(
          `Application for ${values.newApplication} deadline has already passed!`
        );
      }
      return toast.success(
        `Application for ${values.newApplication}  created!`
      ); //newApplication refers to the company name object
    } catch (e) {
      throw new Error("There was a problem creating your new job application.");
    }
  }
}

const Dashboard = () => {
  const { userName, roles: roles } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {roles && roles.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddJobTitle />
                  <AddApplicationForm roles={roles} />
                </div>
                <h2>Existing Applications</h2>
                <div className="applications">
                  {roles.map((role) => {
                    return <ApplicationItem key={role.id} role={role} />;
                  })}
                </div>
              </div>
            ) : (
              <div className="grid-sm">
                <p>
                  Stay positive and keep applying! - the right job is out there
                  for you.
                </p>
                <p>
                  Add a job tittle and set a total applications goal to get
                  started!
                </p>
                <AddJobTitle />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
