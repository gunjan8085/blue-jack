import axiosInstance from "./axios";

export function getProperties(params) {
  return axiosInstance.get(`/property/allProperties`, {
    params: params,
  });
}
