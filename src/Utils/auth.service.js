import {STORAGE_KEY} from "../Constants/Storage";
import LocalStorageService from "../Services/local-storage.service";
import SessionStorageService from "../Services/session-storage.service";

const AuthService = {
  isTokenExist,
  getToken,
  getUserInfo,
  getRole,
};

function getRole() {
  let userInfo =
    LocalStorageService.get(STORAGE_KEY.USER_INFO) ||
    SessionStorageService.get(STORAGE_KEY.USER_INFO);
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    return userInfo?.user?.role;
  }
  return null;
}

function isTokenExist() {
  let token =
    LocalStorageService.get(STORAGE_KEY.TOKEN) ||
    SessionStorageService.get(STORAGE_KEY.TOKEN);
  if (token) {
    return true;
  }
  return false;
}

function getToken() {
  let token =
    LocalStorageService.get(STORAGE_KEY.TOKEN) ||
    SessionStorageService.get(STORAGE_KEY.TOKEN);

  if (token) {
    return token;
  }
  return null;
}

function getUserInfo() {
  let userInfo =
    LocalStorageService.get(STORAGE_KEY.USER_INFO) ||
    SessionStorageService.get(STORAGE_KEY.USER_INFO);
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    return userInfo;
  }
  return null;
}

export default AuthService;
