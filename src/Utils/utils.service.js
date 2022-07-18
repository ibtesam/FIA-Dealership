import get from "lodash.get";
import * as lodashIsEmpty from "lodash.isempty";
import moment from "moment";
import {STORAGE_KEY} from "../Constants/Storage";
import {AUTHENTICATED_ROUTES, UNAUTHENTICATED_ROUTES} from "../Routes/constant";
import LocalStorageService from "../Services/local-storage.service";
import SessionStorageService from "../Services/session-storage.service";

const utilService = {
  getLoginUrl,
  loginUser,
  defaultUrl: AUTHENTICATED_ROUTES.DASHBOARD,
  baseUrl: process.env.REACT_APP_BASE_URL,
  getValue,
  redirectToLogin,
  redirectTo,
  isEmpty,
  replaceNullWithPlaceholder,
  toPercentage,
  capitalizedString,
  getKeyByValue,
  createDynamicUrl,
  convertIntoUnix,
  convertFromUnix,
  convertDateTime,
  getLocal,
};

function getLoginUrl() {
  return UNAUTHENTICATED_ROUTES.LOGIN;
}

function loginUser(data, rememberMe) {
  SessionStorageService.clear();
  LocalStorageService.clear();
  if (!rememberMe) {
    SessionStorageService.set(STORAGE_KEY.USER_INFO, JSON.stringify(data));
    SessionStorageService.set(STORAGE_KEY.TOKEN, data?.token);
  } else {
    LocalStorageService.set(STORAGE_KEY.USER_INFO, JSON.stringify(data));
    LocalStorageService.set(STORAGE_KEY.TOKEN, data?.token);
  }
  redirectTo(AUTHENTICATED_ROUTES.DASHBOARD);
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function capitalizedString(value, placeholder = "--") {
  if (!value) {
    return placeholder;
  }
  let valueArray = value.split(" ");
  valueArray = valueArray.map(item => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  });
  return valueArray.join(" ");
}

function toPercentage(number) {
  if (number) return `${number}%`;
  return "--";
}

function replaceNullWithPlaceholder(value, placeHolder = "--") {
  if (!value) {
    return placeHolder;
  }
  return value;
}

function getValue(...param) {
  return get(...param);
}

function redirectToLogin(loginUrl = getLoginUrl()) {
  utilService.redirectTo(loginUrl);
}

function redirectTo(url) {
  window.location.href = url;
}

function isEmpty(value) {
  return lodashIsEmpty(value);
}

function createDynamicUrl(dynamicUrl, object) {
  for (const key in object) {
    dynamicUrl = dynamicUrl.replace(`{${key}}`, object[key]);
  }
  return dynamicUrl;
}

function convertIntoUnix(date) {
  return moment(date).local().unix();
}

function convertFromUnix(date, format = "MM/DD/YYYY", fromCurrentTime) {
  if (fromCurrentTime) {
    return moment.unix(date).fromNow();
  }
  return moment.unix(date).format(format);
}

function convertDateTime(date, format, fromCurrentTime) {
  if (fromCurrentTime && format) {
    return moment(date, format).fromNow();
  }
  if (fromCurrentTime) {
    return moment(date).fromNow();
  }
  return moment(date).format(format);
}

function getLocal(format) {
  return moment().local().format(format);
}

export default utilService;
