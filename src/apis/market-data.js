import { request } from "../utils/APIUtils";

export const MARKET_DATA_URL = 'http://localhost:3000';

export const getMarketStatus = () => {
  return request({
    url: MARKET_DATA_URL + "/get_market_status",
    method: 'GET'
  });
}

export const getIndices = () => {
  return request({
    url: MARKET_DATA_URL + "/nse/get_indices",
    method: 'GET'
  });
}

export const getGainers = () => {
  return request({
    url: MARKET_DATA_URL + "/nse/get_gainers",
    method: 'GET'
  });
}

export const getLosers = () => {
  return request({
    url: MARKET_DATA_URL + "/nse/get_losers",
    method: 'GET'
  });
}

export const getQuote = (symbol) => {
  return request({
    url: MARKET_DATA_URL + "/nse/get_quote_info?companyName=" + symbol,
    method: 'GET'
  });
}