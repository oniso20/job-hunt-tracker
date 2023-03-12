import React from "react";

// React router imports
import { useLoaderData } from "react-router-dom";

// Components
import Table from "../components/Table";

// import Helper functions
import { fetchData } from "../helpers";

// Data loader function
export const applicationsLoader = () => {
  const applications = fetchData("applications");
  return {
    applications,
  };
};

const ApplicationsPage = () => {
  const { applications } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Job Applications</h1>
      {applications && applications.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Applications <small>({applications.length} total)</small>
          </h2>
          <Table applications={applications} />
        </div>
      ) : (
        <p>No applications to show</p>
      )}
    </div>
  );
};

export default ApplicationsPage;
