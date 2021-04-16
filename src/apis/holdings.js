import { request } from "../utils/APIUtils";

const API_BASE_URL = 'http://localhost:8080';

export const getHoldings = () => {
  return request({
    url: API_BASE_URL + "/holdings",
    method: 'GET'
  });
}

export const getHoldingsFor = (symbol) => {
  return request({
    url: API_BASE_URL + "/holdings/single?symbol=" + symbol,
    method: 'GET'
  });
}