import instance from '@apis/index';

export const modifyEmail = async (newEmail: string) => {
    try {
        const res = await instance.put(
            'users/info',
            {
                email: newEmail,
            },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            },
        );
        if (res.status === 200) {
            alert('이메일이 변경되었습니다.');
        }
    } catch (e: any) {
        console.log(e);
    }
};
