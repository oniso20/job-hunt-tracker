// React router imports
import { redirect } from "react-router-dom";

// Helper imports
import { deleteData } from "../helpers";

// Library
import { toast } from "react-toastify";

export async function logoutAction() {
    // delete the user
    deleteData({ key: "userName" });

    // show a toast
    toast.success("Deleted account successfully");

    // redirect to login page
    return redirect("/");
}