import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import CustomerListing from "../Containers/DashboardPages/Customer/CustomerListing";
import CustomerProfile from "../Containers/DashboardPages/Customer/CustomerProfile";
import MyVehicle from "../Containers/DashboardPages/MyVehicle";
import MyProfile from "../Containers/DashboardPages/Profile/MyProfile";
import VehicleListing from "../Containers/DashboardPages/Vehicle/VehicleListing";
import ViewVehicle from "../Containers/DashboardPages/Vehicle/ViewVehicle";
import {AUTHENTICATED_ROUTES} from "./constant";
import CustomRoute from "./CustomRoute";

export default function AuthenticatedApp() {
  return (
    <Switch>
      <CustomRoute
        exact
        path={AUTHENTICATED_ROUTES.PROFILE}
        component={MyProfile}
        title="User Profile"
      />
      <CustomRoute
        exact
        path={AUTHENTICATED_ROUTES.CUSTOMER_LISTING}
        component={CustomerListing}
        title="Customer"
      />
      <CustomRoute
        exact
        path={AUTHENTICATED_ROUTES.VEHICLE_LISTING}
        component={VehicleListing}
        title="Vehicles"
      />
      <CustomRoute
        exact
        path={AUTHENTICATED_ROUTES.MY_VEHICLE}
        component={MyVehicle}
        title="My Vehicles"
      />
      <CustomRoute
        exact
        path={AUTHENTICATED_ROUTES.CUSTOMER_PROFILE}
        component={CustomerProfile}
        title="Customer Profile"
      />
      <CustomRoute
        exact
        path={AUTHENTICATED_ROUTES.VIEW_VEHICLE}
        component={ViewVehicle}
        title="View Vehicle"
      />
      <Route path="*" component={VehicleListing}>
        <Redirect to={AUTHENTICATED_ROUTES.VEHICLE_LISTING} />
      </Route>
    </Switch>
  );
}
