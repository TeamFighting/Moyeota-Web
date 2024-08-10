import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface accountDtoList {
    accountNumber: string;
    bankName: string;
}
interface MyInfo {
    name: string;
    age: string;
    averageStarRate: number | null;
    email: string | null;
    loginId: string | null;
    nickName: string | null;
    phoneNumber: string | null;
    profileImage: string;
    userId: number;
    school: string | null;
    status: string;
    gender: string;
    accountDtoList: accountDtoList[];
    setMyInfo: (data: MyInfo) => void;
}

export const useMyInfoStore = create(
    persist<MyInfo>(
        (set) => ({
            accountDtoList: [{ accountNumber: '', bankName: '' }],
            name: '',
            age: '',
            averageStarRate: null,
            email: null,
            loginId: null,
            nickName: null,
            phoneNumber: null,
            profileImage: '',
            userId: 0,
            gender: '',
            school: null,
            status: '',
            setMyInfo: (data: MyInfo) => set(data),
        }),
        {
            name: 'my-info',
            getStorage: () => localStorage,
        },
    ),
);
