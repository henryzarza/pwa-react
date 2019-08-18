import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://private-5a5cf-dccomics.apiary-mock.com/', // replaced this by your endpoint :)
  timeout: 15000
});
