import { create } from 'zustand';

interface MyInfo {
    name: string;
    age: number;
    averageStarRate: number | null;
    email: string | null;
    loginId: string | null;
    nickname: string | null;
    phoneNumber: string | null;
    profileImage: string;
}
interface MyInfoState extends MyInfo {
    setMyInfo: (data: MyInfo) => void;
}

export const useMyInfoStore = create<MyInfoState>((set) => ({
    name: '',
    age: 0,
    averageStarRate: null,
    email: null,
    loginId: null,
    nickname: null,
    phoneNumber: null,
    profileImage: '',

    setMyInfo: (data) => set(() => ({ ...data })),
}));
