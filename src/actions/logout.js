import { redirect } from "react-router-dom";
import { deleteData } from "../helpers";

export async function logoutAction() {
    // delete the user
    deleteData({ key: "userName" });

    // redirect to login page
    return redirect("/");
}