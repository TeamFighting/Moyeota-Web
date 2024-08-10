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
            return true;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        console.log(e);
        if (e.response.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            alert('refreshtoken 만료');
            // window.location.href = '/login';
        }
        return false;
    }
};
