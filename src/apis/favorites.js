import { request } from "../utils/APIUtils";

const API_BASE_URL = 'http://localhost:8080';

export const getFavoriteStocks = () => {
  return request({
    url: API_BASE_URL + "/favorites",
    method: 'GET'
  });
}

export const addToFavorites = (favoritesRequest) => {
  return request({
    url: API_BASE_URL + "/favorites/add",
    method: 'POST',
    body: JSON.stringify(favoritesRequest)
  });
}

export const removeFromFavorites = (favoritesRequest) => {
  return request({
    url: API_BASE_URL + "/favorites/remove",
    method: 'POST',
    body: JSON.stringify(favoritesRequest)
  });
}

export const isFavorite = (symbol) => {
  return request({
    url: API_BASE_URL + "/favorites/isFavorite?symbol="+symbol,
    method: 'GET'
  });
}