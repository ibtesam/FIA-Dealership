import React from "react";

const AuthenticatedAppRoutes = React.lazy(() => import("../Routes/authenticated-app-routes"));

const Routes = () => {
    return <AuthenticatedAppRoutes />;
};

export default Routes;
