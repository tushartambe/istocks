import { JWT_TOKEN } from "../constants/constants";
import { request } from "../utils/APIUtils";

export const API_BASE_URL = 'http://localhost:8080';

export const login = (loginRequest) => {
  return request({
    url: API_BASE_URL + "/authenticate",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export const register = (registerRequest) => {
  localStorage.removeItem(JWT_TOKEN);
  return request({
    url: API_BASE_URL + "/register",
    method: 'POST',
    body: JSON.stringify(registerRequest)
  });
}

export const checkToken = () => {
  return request({
    url: API_BASE_URL + "/checkToken",
    method: 'GET'
  });
}