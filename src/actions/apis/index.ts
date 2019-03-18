import axios from 'axios';

const client = axios.create({
  baseURL: 'https://staging-api.venuegenie.com',
});

export const fetchDataService = (url: string, headers: Object) => client.get(
  url, {
    headers: {
      ...headers,
    },
  },
)
  .then(response => response)
  .catch(err => err);

export const postDataService = (url: string, item: Object, headers: Object) => client.post(url, item, {
  headers: {
    ...headers,
  },
})
  .then(response => response)
  .catch(err => err);

export const updateDataService = (url: string, item: Object, headers: Object) => client.patch(url, item, {
  headers: {
    ...headers,
  },
})
.then(response => response)
.catch(err => err);

export const deleteDataService = (url: string, headers: Object) => client.delete(
  url, {
    headers: {
      ...headers,
    },
  },
)
.then(response => response)
.catch(err => err);
