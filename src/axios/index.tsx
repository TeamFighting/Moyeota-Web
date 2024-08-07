import axios, { AxiosInstance } from 'axios';
import { UseGetNewAccessToken } from '../Hooks/Auth/useGetNewAccessToken';

export const instance: AxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: 'https://moyeota.site/api',
    withCredentials: true,
});

const { getNewAccessToken } = UseGetNewAccessToken();

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        if (error.response.status === 401) {
            console.log('axios interceptors 401 error');
            const newAccessToken = await getNewAccessToken(localStorage.getItem('accessToken')!);
            if (newAccessToken) {
                localStorage.setItem('accessToken', newAccessToken);
                error.config.headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${newAccessToken}`,
                };
                console.log('newAccessToken', newAccessToken);
                const originalResponse = await instance.request(error.config);
                console.log('originalResponse', originalResponse);
                return originalResponse;
            }
        }
        return Promise.reject(error);
    },
);
