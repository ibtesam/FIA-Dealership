import {AUTHENTICATED_ROUTES} from "../Routes/constant";

export const ROLE_DEFAULT_ROUTE = {
  Admin: AUTHENTICATED_ROUTES.DASHBOARD,
  User: AUTHENTICATED_ROUTES.DASHBOARD,
};

export const ROLES = {
  GlobalAdmin: "GlobalAdmin",
  User: "User",
  RegionalAdmin: "RegionalAdmin",
};

export const MAIN_SIDE_BAR_OPTIONS = {
  GlobalAdmin: [
    {
      text: "Customers",
      linkTo: AUTHENTICATED_ROUTES.CUSTOMER_LISTING,
      selectedOptionKey: "customer",
      icon: "fia-customer",
    },
    {
      text: "Vehicles",
      linkTo: AUTHENTICATED_ROUTES.VEHICLE_LISTING,
      selectedOptionKey: "vehicle",
      icon: "fia-vehicle",
    },
    {
      text: "My Profile",
      linkTo: AUTHENTICATED_ROUTES.PROFILE,
      selectedOptionKey: "profile",
      icon: "fia-account",
    },
  ],
  Customer: [
    {
      text: "Vehicles",
      linkTo: AUTHENTICATED_ROUTES.VEHICLE_LISTING,
      selectedOptionKey: "vehicle",
      icon: "fia-vehicle",
    },
    {
      text: "My Vehicles",
      linkTo: AUTHENTICATED_ROUTES.MY_VEHICLE,
      selectedOptionKey: "my vehicle",
      icon: "fia-vehicle",
    },
    {
      text: "My Profile",
      linkTo: AUTHENTICATED_ROUTES.PROFILE,
      selectedOptionKey: "profile",
      icon: "fia-account",
    },
  ],
};
