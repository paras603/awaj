import { Outlet } from "react-router";
import withAuth from "../../auth/withAuth.jsx";

function ProtectedLayout(){
    return(
        <div>
            <Outlet/>
        </div>
    )
}

export default withAuth(ProtectedLayout);