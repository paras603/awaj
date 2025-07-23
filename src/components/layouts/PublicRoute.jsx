import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { getToken } from "../../auth/tokenService";

export default function PublicRoute({children}){
    const { isAutheticated } = getToken();

    console.log("user is außthenticated")
    if(isAutheticated){
        return <Navigate to="/dashboard" replace />
    }

    return children;
}