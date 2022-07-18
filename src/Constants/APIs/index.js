export const API_CONFIG = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
  BASE_URL_DEV: "https://fiadealerships.azurewebsites.net",
};

export const API_ROUTES = {
  //Auth
  register: "/api/v1/Auth/register",
  login: "/api/v1/Auth/login",
  forgetPassword: "/api/v1/Auth/forgetpassword",
  updatePassword: "/api/v1/Auth/updatepassword",
  resetPassword: "/api/v1/Auth/resetPassword",
  logout: "/api/v1/Auth/logout",
  me: "/api/v1/Auth/me",
  invite: "/api/v1/Auth/invite",
  setPassword: "/api/v1/Auth/setpassword",
  getProfile: "/api/v1/Auth/myprofile",
  updateProfile: "/api/v1/Auth/profile/{accountId}",

  //Customer
  createCustomer: "/api/v1/Customer",
  customerDetail: "/api/v1/Customer/{id}",
  customerList: "/api/v1/Customer/list",
  customerTransations: "/api/v1/Customer/{customerId}/transations",
  customerBuy: "/api/v1/Customer/{customerId}/buy/{vehicleId}",

  //Vehicle
  vehicleDetail: "/api/v1/Vehicle/{vehicleId}",
  createVehicle: "/api/v1/Vehicle",
  assignVehicle: "/api/v1/Vehicle/{vehicleId}/assign-to/{customerId}",
  vehicleList: "/api/v1/Vehicle/list",
  customerVehicleList: "/api/v1/Vehicle/{customerId}/vehicles",
};

export const CONTENT_TYPE = {
  JSON: "application/json",
  FORM_DATA: "multipart/form-data",
  TEXT: "text/plain",
};

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  OK: 200,
  CREATED: 201,
  PAYLOAD_TOO_LARGE: 413,
  SERVER_ERROR: 500,
};

export const PAGE_SIZE = 10;
