import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BodyDataProps {
    data: {
        EachAmount: {
            userId: number;
            amount: number;
            name: string;
            profileImage: string;
            isPartyOwner: boolean;
        }[];
        isPayed: {
            userId: number;
            isPayed: boolean;
        }[];
        isPartyOwner: boolean;
        account: { accountNumber: string; bankName: string };
        postId: number;
        potName: string;
        totalAmount: string;
        totalPeople: number;
    };
}

interface MyPotStore {
    MyPotContent: BodyDataProps[];
    setMyPotContent: (MyPotContent: BodyDataProps[]) => void;
    setClearMyPotContent: () => void;
}

export const CurrentReimburseStore = create(
    persist<MyPotStore>(
        (set) => ({
            MyPotContent: [],
            setMyPotContent: (MyPotContent) => set({ MyPotContent }),
            setClearMyPotContent: () => set({}),
        }),
        {
            name: 'current-reimburse-storage',
            getStorage: () => localStorage,
        },
    ),
);
