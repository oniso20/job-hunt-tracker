/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { totalApplied } from "../helpers";

const ApplicationItem = ({ role }) => {
  const { id, name, amount, color } = role;
  const applied = totalApplied(id);
  const remaining = amount - applied;

  return (
    <div
      className="application"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{amount} Planned</p>
      </div>
      <progress max={amount} value={applied}>
        {`${Math.round((applied / amount) * 100)}%`}
      </progress>
      <div className="progress-text">
        <small>Applied for {applied}</small>
        <div className="progress-text">
          <div>
            {remaining < 0 && <small>You've exceeded your goal!</small>}
            {remaining === 0 && <small>You've reached your goal!</small>}
            {remaining > 0 && (
              <small>{remaining} remaining to reach your goal</small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationItem;
