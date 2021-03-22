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