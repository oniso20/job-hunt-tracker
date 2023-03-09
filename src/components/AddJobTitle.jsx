import React from "react";

// Library imports
// Heroicons
import { BriefcaseIcon } from "@heroicons/react/24/solid";

// React router imports
import { Form } from "react-router-dom";

const AddJobTitle = () => {
  return (
    <div className="form-wrapper">
      <h2 className="h3">Add a Job Tittle</h2>
      <Form method="post" className="grid-sm">
        <div className="grid-xs">
          <label htmlFor="newJobTitle">Job Title</label>
          <input
            id="newJobTitle"
            type="text"
            name="newJobTitle"
            required
            placeholder="e.g., Data Analyst, Frontend Developer etc."
            aria-label="Job Title"
            autoComplete="off"
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="targetAmount">Set Target </label>
          <input
            id="targetAmount"
            type="number"
            step="1"
            min="1"
            name="targetAmount"
            required
            placeholder="e.g., 20"
            aria-label="Target Amount"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn--dark">
          <span>Add New Role</span>
          <BriefcaseIcon width={20} />
        </button>
      </Form>
    </div>
  );
};

export default AddJobTitle;
