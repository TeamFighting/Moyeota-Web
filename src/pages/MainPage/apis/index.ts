import instance from '@apis/index';
import { getAccessToken } from '@utils/getInfoFromLocalStorage';

const accessToken = getAccessToken();

interface getMyPostProps {
    setMyPot: (data: number[]) => void;
    setMyPotContent: (MyPotContent: MyPotType[]) => void;
    userId: string;
}

export const fetchMyPost = async ({ setMyPot, setMyPotContent, userId }: getMyPostProps) => {
    try {
        const myPost = await instance.get(`/posts/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (myPost.status === 200) {
            const newArr: number[] = [];
            setMyPotContent(myPost.data.data);
            myPost.data.data.forEach((post: any) => newArr.push(post.postId));
            setMyPot(newArr);
        }
    } catch (e: any) {
        throw new Error(e);
    }
};

interface fetchUserInfoProps {
    setMyInfo: (data: MyInfo) => void;
}

export const fetchUserInfo = async ({ setMyInfo }: fetchUserInfoProps) => {
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
};

interface fetchAllPostProps {
    updateTotalData: (data: MyPotType[]) => void;
}
export const fetchAllPost = async ({ updateTotalData }: fetchAllPostProps) => {
    try {
        const res = await instance.get('/posts');
        if (res.status === 200) {
            updateTotalData(res.data.data);
        } else {
            alert(res.status + '에러');
        }
    } catch (e: any) {
        throw new Error(e);
    }
};
