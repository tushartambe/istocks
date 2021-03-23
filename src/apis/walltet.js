const JWT_TOKEN = 'jwtToken';
const API_BASE_URL = 'http://localhost:8080';

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

export const getAvailableBalance = () => {
  return request({
    url: API_BASE_URL + "/wallet/balance",
    method: 'GET'
  });
}
