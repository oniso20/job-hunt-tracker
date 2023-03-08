// React router imports
import { redirect } from "react-router-dom";

// Helper imports
import { deleteData } from "../helpers";

// Library

export async function logoutAction() {
    // delete the user
    deleteData({ key: "userName" });

    // redirect to login page
    return redirect("/");
}