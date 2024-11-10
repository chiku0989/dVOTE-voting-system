import { Navigate } from "react-router-dom";

const DefaultNavigation = (user) => {
    if (user?.type === "owner") return "/ownerdash";
    if (user?.type === "candidate") return "/candidatedash";
    if (user?.type === "voter") return "/voterdash";
    return "/login";
}
export default DefaultNavigation