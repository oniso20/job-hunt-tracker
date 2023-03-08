import React from "react";

// library
import { TrashIcon } from "@heroicons/react/24/solid";

// React router imports
import { Form, NavLink } from "react-router-dom";

// Assets
import logo from "../assets/job.jpeg";

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to home">
        <img src={logo} alt="Job tracking logo" height={40} />
        <span>JobHunt</span>
      </NavLink>
      {userName && (
        <Form
          action="/logout"
          method="post"
          onSubmit={(e) => {
            if (!confirm("Delete user and all data?")) {
              e.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Delete User</span>
            <TrashIcon className="icon" width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
