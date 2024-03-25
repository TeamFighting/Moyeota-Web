import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MyInfo {
    name: string;
    age: number;
    averageStarRate: number | null;
    email: string | null;
    loginId: string | null;
    nickname: string | null;
    phoneNumber: string | null;
    profileImage: string;
    id: number;
    school: string | null;
    status: string;
    gender: string;
    setMyInfo: (data: MyInfo) => void;
}

export const useMyInfoStore = create(
    persist<MyInfo>(
        (set) => ({
            name: '',
            age: 0,
            averageStarRate: null,
            email: null,
            loginId: null,
            nickname: null,
            phoneNumber: null,
            profileImage: '',
            id: 0,
            gender: '',
            school: null,
            status: '',
            setMyInfo: (data: MyInfo) => set(data),
        }),
        {
            name: 'my-info',
            getStorage: () => sessionStorage,
        },
    ),
);
