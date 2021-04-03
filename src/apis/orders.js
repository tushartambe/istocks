import { request } from "../utils/APIUtils";

const API_BASE_URL = 'http://localhost:8080';

export const placeOrder = (orderRequest) => {
  return request({
    url: API_BASE_URL + "/orders",
    method: 'POST',
    body: JSON.stringify(orderRequest)
  });
}

export const getOrders = () => {
  return request({
    url: API_BASE_URL + "/orders",
    method: 'GET'
  });
}