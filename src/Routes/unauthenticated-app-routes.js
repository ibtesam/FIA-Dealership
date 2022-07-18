import React from "react";
import CustomRoute from "./CustomRoute";
import {UNAUTHENTICATED_ROUTES} from "./constant";
import {Redirect, Route, Switch} from "react-router-dom";

const Login = React.lazy(() => import("../Containers/AuthPages/Login"));
const Register = React.lazy(() => import("../Containers/AuthPages/Register"));
const ForgetPassword = React.lazy(() => import("../Containers/AuthPages/ForgetPassword"));
const ResetPassword = React.lazy(() => import("../Containers/AuthPages/ResetPassword"));
const SetPassword = React.lazy(() => import("../Containers/AuthPages/SetPassword/SetPassword"));

export default function UnAuthenticatedApp() {
  return (
    <Switch>
      <CustomRoute exact path={UNAUTHENTICATED_ROUTES.LOGIN} component={Login} title="Login" />
      <CustomRoute
        exact
        path={UNAUTHENTICATED_ROUTES.REGISTER}
        component={Register}
        title="Register"
      />
      <CustomRoute
        exact
        path={UNAUTHENTICATED_ROUTES.FORGET_PASSWORD}
        component={ForgetPassword}
        title="Forgot Password"
      />
      <CustomRoute
        exact
        path={UNAUTHENTICATED_ROUTES.RESET_PASSWORD}
        component={ResetPassword}
        title="Reset Password"
      />
      <CustomRoute
        exact
        path={UNAUTHENTICATED_ROUTES.SET_PASSWORD}
        component={SetPassword}
        title="Set Password"
      />
      <Route exact path="*" component={Login}>
        <Redirect to={UNAUTHENTICATED_ROUTES.LOGIN} />
      </Route>
    </Switch>
  );
}
