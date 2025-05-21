import Dashboard from "../pages/dashboard";
import withAuth from "./withAuth";

const ProtectedLayout = withAuth(Dashboard);

export default ProtectedLayout;