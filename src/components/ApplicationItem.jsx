import React from "react";

const ApplicationItem = ({ role }) => {
  const { id, name, amount, color } = role;

  return (
    <div className="application">
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{amount} Planned</p>
      </div>
      <progress max={amount} value="3"></progress>
      <div className="progress-text">
        <small>... Applied</small>
        <small>... remaining</small>
      </div>
    </div>
  );
};

export default ApplicationItem;
