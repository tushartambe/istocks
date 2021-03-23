import { request } from "../utils/APIUtils";

const API_BASE_URL = 'http://localhost:8080';

export const getAvailableBalance = () => {
  return request({
    url: API_BASE_URL + "/wallet/balance",
    method: 'GET'
  });
}
