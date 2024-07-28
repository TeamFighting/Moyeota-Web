import { instance } from '../axios';

export const UseGetNewAccessToken = async (accessToken: string) => {
  try {
    const res = await instance.post('/oauth/refresh', {
      accessToken: accessToken,
      refreshToken: localStorage.getItem('refreshToken'),
    });

    if (res.status === 200) {
      localStorage.setItem('accessToken', res.data.data.accessToken);
      return true;
    } else if (res.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
