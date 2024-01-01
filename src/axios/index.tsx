import axios, { AxiosInstance } from 'axios';

export const instance: AxiosInstance = axios.create({
    baseURL: 'https://54.180.20.255/api',
});
