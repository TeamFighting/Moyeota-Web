import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
