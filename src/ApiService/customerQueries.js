import {useMutation, useQuery} from "react-query";
import {request} from "../Actions/ServiceAction";
import {API_CONFIG, API_ROUTES} from "../Constants/APIs";
import {STORAGE_KEY} from "../Constants/Storage";
import utilService from "../Utils/utils.service";

export function useGetCustomerListing(payload) {
  return useQuery([STORAGE_KEY.CUSTOMER_LIST, payload], async () => {
    const {data} = await request({
      url: API_ROUTES.customerList,
      method: API_CONFIG.POST,
      params: payload,
    });

    return data;
  });
}

export function useGetCustomerDetails(id) {
  return useQuery(
    [STORAGE_KEY.CUSTOMER_INFO, id],
    async () => {
      const {data} = await request({
        url: utilService.createDynamicUrl(API_ROUTES.customerDetail, id),
        method: API_CONFIG.GET,
      });

      return data;
    },
    {staleTime: Infinity, cacheTime: Infinity}
  );
}

export function useAddCustomer(options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: API_ROUTES.createCustomer,
      method: API_CONFIG.POST,
      params: payload,
    });
    return data;
  }, options);
}

export function useEditCustomer(params, options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: utilService.createDynamicUrl(API_ROUTES.customerDetail, params),
      method: API_CONFIG.PUT,
      params: payload,
    });
    return data;
  }, options);
}

export function useCustomerBuy(options) {
  return useMutation(async params => {
    const {data} = await request({
      url: utilService.createDynamicUrl(API_ROUTES.customerBuy, params),
      method: API_CONFIG.POST,
    });
    return data;
  }, options);
}
