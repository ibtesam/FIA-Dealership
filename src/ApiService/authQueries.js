import {useMutation, useQuery} from "react-query";
import {request} from "../Actions/ServiceAction";
import {API_CONFIG, API_ROUTES} from "../Constants/APIs";
import {STORAGE_KEY} from "../Constants/Storage";
import utilService from "../Utils/utils.service";

export function useLogin(options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: API_ROUTES.login,
      method: API_CONFIG.POST,
      params: payload,
    });
    return data;
  }, options);
}

export function useRegister(options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: API_ROUTES.register,
      method: API_CONFIG.POST,
      params: payload,
    });
    return data;
  }, options);
}

export function useGetDetails(options) {
  return useQuery(
    STORAGE_KEY.USER_INFO,
    async () => {
      const {data} = await request({
        url: API_ROUTES.me,
        method: API_CONFIG.GET,
      });

      return data;
    },
    options
  );
}

export function useForgetPassword(options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: API_ROUTES.forgetPassword,
      method: API_CONFIG.POST,
      params: payload,
    });
    return data;
  }, options);
}

export function useUpdatePassword(options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: API_ROUTES.updatePassword,
      method: API_CONFIG.POST,
      params: payload,
    });
    return data;
  }, options);
}

export function useResetPassword(options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: API_ROUTES.resetPassword,
      method: API_CONFIG.POST,
      params: payload,
    });
    return data;
  }, options);
}

export function useLogout(options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: API_ROUTES.logout,
      method: API_CONFIG.POST,
      params: payload,
    });
    return data;
  }, options);
}

export function useInvite(options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: API_ROUTES.invite,
      method: API_CONFIG.POST,
      params: payload,
    });
    return data;
  }, options);
}

export function useSetPassword(options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: API_ROUTES.setPassword,
      method: API_CONFIG.POST,
      params: payload,
    });
    return data;
  }, options);
}

export function useGetProfile() {
  return useQuery(STORAGE_KEY.USER_PROFILE, async () => {
    const {data} = await request({
      url: API_ROUTES.getProfile,
      method: API_CONFIG.GET,
    });
    return data;
  });
}

export function useUpdateProfile(params, options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: utilService.createDynamicUrl(API_ROUTES.updateProfile, params),
      method: API_CONFIG.PUT,
      params: payload,
    });
    return data;
  }, options);
}
