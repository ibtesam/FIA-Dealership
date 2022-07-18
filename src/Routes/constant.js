export const UNAUTHENTICATED_ROUTES = {
  TEST: "/test",
  LOGIN: "/login",
  REGISTER: "/register",
  RESET_PASSWORD: "/resetpassword",
  FORGET_PASSWORD: "/forgetpassword",
  SET_PASSWORD: "/setpassword/*",
};

export const AUTHENTICATED_ROUTES = {
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  CUSTOMER_LISTING: "/customer",
  VEHICLE_LISTING: "/vehicles",
  CUSTOMER_PROFILE: "/customer/:customerId",
  VIEW_VEHICLE: "/vehicle/:id",
  ADD_VEHICLE: "/add-vehicle",
  MY_VEHICLE: "/my-vehicle",
};
