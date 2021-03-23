import { request } from "../utils/APIUtils";

export const API_BASE_URL = 'http://localhost:8080';

export const login = (loginRequest) => {
  return request({
    url: API_BASE_URL + "/authenticate",
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function register(registerRequest) {
  return request({
    url: API_BASE_URL + "/register",
    method: 'POST',
    body: JSON.stringify(registerRequest)
  });
}