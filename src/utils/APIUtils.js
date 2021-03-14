export const JWT_TOKEN = 'jwtToken';
export const API_BASE_URL = 'http://localhost:8080';

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  if (localStorage.getItem(JWT_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(JWT_TOKEN));
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
};


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