import React from "react";

// React router imports
import { useLoaderData } from "react-router-dom";

// Library imports
import { toast } from "react-toastify";

// Components
import AddApplicationForm from "../components/AddApplicationForm";
import RoleItem from "../components/RoleItem";
import Table from "../components/Table";

// helpers
import { createApplication, deleteData, getAllMatchingItems } from "../helpers";

// loader
export const roleLoader = async ({ params }) => {
  const role = await getAllMatchingItems({
    category: "roles",
    key: "id",
    value: params.id,
  })[0];

  const applications = await getAllMatchingItems({
    category: "applications",
    key: "roleId",
    value: params.id,
  });

  // errors
  if (!role) {
    throw new Error("The job role you're trying to find does not exist");
  }

  // error
  if (!applications) {
    throw new Error("The application you're trying to find does not exist");
  }

  return {
    role,
    applications,
  };
};

// action
export const roleAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // delete application
  if (_action === "deleteApplication") {
    try {
      deleteData({
        key: "applications",
        id: values.applicationId,
      });
      return toast.success("Application deleted");
    } catch (err) {
      throw new Error("There was an error deleting the application.");
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
        roleId: values.matchingRole,
      });
      // Check if deadlineDate has already passed
      const deadlineDate = new Date(values.deadlineDate);
      const today = new Date();
      if (
        deadlineDate < today &&
        values.status.toLowerCase() === "interested"
      ) {
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
};

const RolePage = () => {
  const { role, applications } = useLoaderData();
  return (
    <div
      className="grid-lg"
      style={{
        "--accent": role.color,
      }}
    >
      <h2 className="h2">
        <span className="accent">{role.name}</span> Overview
      </h2>
      <div className="flex-lg">
        <RoleItem role={role} showDelete={true} />
        <AddApplicationForm roles={[role]} />
      </div>
      {applications && applications.length > 0 ? (
        <div className="grid-md">
          <h2>
            <span className="accent">{role.name}</span> Applications
          </h2>
          <Table applications={applications} />
        </div>
      ) : (
        <p>No applications to show</p>
      )}
    </div>
  );
};

export default RolePage;
