// helpers
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteData, getAllMatchingItems } from "../helpers";

// delete role
export const deleteRole = ({ params }) => {
    try {
        deleteData({
            key: "roles",
            id: params.id
        });

        const associatedApplications = getAllMatchingItems({
            category: "applications",
            key: "roleId",
            value: params.id
        });

        associatedApplications.forEach((application) => {
            deleteData({
                key: "applications",
                id: application.id
            });
        });

        toast.success("Deleted role successfully");

    } catch (e) {
        throw new Error("Error deleting role");
    }

    return redirect("/");

};
