import withAuth from "../../auth/withAuth.jsx";
import Dashboard from "../../pages/dashboard";

const ProtectedLayout = withAuth(Dashboard);

export default ProtectedLayout;