import instance from '@apis/index';
import { useMyInfoStore } from '@stores/MyInfo';
import { getAccessToken } from '@utils/getAccessToken';

export function useUserInfo() {
    const { setMyInfo } = useMyInfoStore();

    async function fetchUserInfo() {
        const accessToken = getAccessToken();
        try {
            const res = await instance.get('/users', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (res.status === 200) {
                setMyInfo(res.data.data);
                localStorage.setItem('myInfo', JSON.stringify(res.data.data));
            }
        } catch (e: any) {
            alert('사용자 정보를 불러오는데 실패했습니다.');
        }
    }

    return { fetchUserInfo };
}
