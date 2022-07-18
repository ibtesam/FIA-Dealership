import {useMutation, useQuery} from "react-query";
import {request} from "../Actions/ServiceAction";
import {API_CONFIG, API_ROUTES} from "../Constants/APIs";
import {STORAGE_KEY} from "../Constants/Storage";
import utilService from "../Utils/utils.service";

export function useGetVehicleListing(payload) {
  return useQuery([STORAGE_KEY.VEHICLE_LIST, payload], async () => {
    const {data} = await request({
      url: API_ROUTES.vehicleList,
      method: API_CONFIG.POST,
      params: payload,
    });

    return data;
  });
}

export function useGetCustomerVehicles(payload, params) {
  return useQuery([STORAGE_KEY.CUSTOMER_V_LIST, payload], async () => {
    const {data} = await request({
      url: utilService.createDynamicUrl(API_ROUTES.customerVehicleList, params),
      method: API_CONFIG.POST,
      params: payload,
    });

    return data;
  });
}

export function useGetVehicleDetails(vehicleId) {
  return useQuery(
    [STORAGE_KEY.VEHICLE_INFO, vehicleId],
    async () => {
      const {data} = await request({
        url: utilService.createDynamicUrl(API_ROUTES.vehicleDetail, vehicleId),
        method: API_CONFIG.GET,
      });

      return data;
    },
    {staleTime: Infinity, cacheTime: Infinity}
  );
}

export function useAddVehicle(options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: API_ROUTES.createVehicle,
      method: API_CONFIG.POST,
      params: payload,
    });
    return data;
  }, options);
}

export function useEditVehicle(params, options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: utilService.createDynamicUrl(API_ROUTES.vehicleDetail, params),
      method: API_CONFIG.PUT,
      params: payload,
    });
    return data;
  }, options);
}
