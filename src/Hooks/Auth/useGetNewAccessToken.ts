import { instance } from '../../axios';
import { Cookies } from 'react-cookie';
// 새로운 액세스 토큰을 받는 커스텀 훅
export const UseGetNewAccessToken = () => {
    const getNewAccessToken = async (accessToken: string) => {
        const getCookie = new Cookies();
        try {
            const res = await instance.post('/users/refresh-token', {
                accessToken: accessToken,
                refreshToken: getCookie.get('refreshToken'),
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
