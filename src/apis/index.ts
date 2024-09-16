import { CustomError_Class } from '@constants/customErr';
import { UseGetNewAccessToken } from '@hooks/Auth/useGetNewAccessToken';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
const { getNewAccessToken } = UseGetNewAccessToken();

const instance: AxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: 'https://moyeota.site/api',
    withCredentials: true,
});

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        if (error.response.status === 401) {
            const newAccessToken = await getNewAccessToken(localStorage.getItem('accessToken')!);
            if (newAccessToken) {
                localStorage.setItem('accessToken', newAccessToken);
                error.config.headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${newAccessToken}`,
                };
                try {
                    const originalResponse = await instance.request(error.config);
                    return originalResponse;
                } catch (e: unknown) {
                    if (e instanceof CustomError_Class && e.response?.status === 401) {
                        localStorage.removeItem('accessToken');
                        alert('세션이 만료되었습니다. 재로그인해주세요');
                        window.location.href = '/login';
                    }
                }
            }
        }
        return Promise.reject(error);
    },
);
export default instance;
