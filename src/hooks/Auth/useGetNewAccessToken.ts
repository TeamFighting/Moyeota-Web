import instance from '@apis';

import { useGetRefreshToken as UseRefreshtoken } from './useGetRefreshToken';
// 새로운 액세스 토큰을 받는 커스텀 훅
export const UseGetNewAccessToken = () => {
    const getNewAccessToken = async (accessToken: string) => {
        const refreshTokenfromCookie = UseRefreshtoken();
        try {
            const res = await instance.post('/users/refresh-token', {
                accessToken: 'Bearer ' + accessToken,
                refreshToken: 'Bearer ' + refreshTokenfromCookie,
            });
            if (res.status === 200) {
                const newAccessToken = res.data.data.accessToken;
                localStorage.removeItem('accessToken');
                localStorage.setItem('accessToken', newAccessToken);
                return newAccessToken;
            }
        } catch (e: any) {
            if (e.response.status === 401) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                alert('Refresh token expired');
                window.location.href = '/login';
            }
            return null;
        }
    };

    return { getNewAccessToken };
};
