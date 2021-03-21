export const MARKET_DATA_URL = 'http://localhost:3000';

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

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