import type { AxiosInstance } from 'axios';
import axios from 'axios';

const instance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://moyeota.site/api',
});

export default instance;
