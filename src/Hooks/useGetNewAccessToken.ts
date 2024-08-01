import { instance } from '../axios';

export const UseGetNewAccessToken = async (accessToken: string) => {
    try {
        const res = await instance.post('/users/refresh-token', {
            accessToken: accessToken,
            refreshToken: localStorage.getItem('refreshToken'),
        });
        console.log(res);
        if (res.status === 200) {
            localStorage.setItem('accessToken', res.data.data.accessToken);
            return res.data.data.accessToken;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        console.log(e);
        if (e.response.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            alert('로그인이 필요합니다.');
            // window.location.href = '/login';
        }
        return false;
    }
};
