import { Outlet } from "react-router";
import withAuth from "../../auth/withAuth";
import withGuest from "../../auth/withGuest";

function PublicLayout(){
    return(
        <div>
            <Outlet/>
        </div>
    )
}

export default withGuest(PublicLayout);