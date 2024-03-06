import { useEffect } from 'react';
import { instance } from '../../axios';

function MyPotPage() {
    const { id } = JSON.parse(localStorage.getItem('myInfo') as string);
    useEffect(() => {
        getMyPot();
    }, []);
    const getMyPot = async () => {
        try {
            const res = await instance.get(`/posts/users/${id}`, {
                params: {
                    page: 0,
                },
            });
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };
    return <div></div>;
}

export default MyPotPage;
