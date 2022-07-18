// import {
//   isNetworkReachable,
//   isConnected,
// } from "react-native-reachability-popup";
import ApiService from "../Services/ApiService";
import notificationService from "../Services/notification.service";

// TODO: Handle unhandel prmomise rejection on failure
export async function request({
  url, //Service url
  method, //Web Service type 'post,get,put,delete....'
  params, //Paramter for request
  config, //APIrequest Configuration
  showToast = true,
}) {
  //   if (!isNetworkReachable() && !isConnected()) {
  //     return {
  //       type: NO_INTERNET,
  //     };
  //   }
  // showLoader && showSpinner();
  const response = (await ApiService[method]?.(url, params, config)) || {};

  // hideSpinner();
  if (response.ok) {
    return response;
  } else {
    showToast && notificationService.error(response?.response.message);
    throw new Error(response?.response);
  }
}
