import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MyPotType {
    category: string;
    content: string;
    createAt: string;
    departure: string;
    departureTime: string;
    destination: string;
    distance: number;
    duration: number;
    fare: number;
    numberOfParticipants: number;
    numberOfRecruitment: number;
    postId: number;
    profileImage: string;
    sameGenderStatus: string;
    status: string;
    title: string;
    userGender: boolean;
    userName: string;
    vehicle: string;
    view: number;
}
interface MyPotStore {
    MyPotContent: MyPotType[];
    MyAppliedPotContent: MyPotType[];
    TotalMyPotContent: MyPotType[];

    setMyPotContent: (MyPotContent: MyPotType[]) => void;
    setTotalMyPotContent: (TotalMyPotContent: MyPotType[]) => void;
    setMyAppliedPotContent: (MyAppliedPotContent: MyPotType[]) => void;
}
export const useMyPotContentStore = create(
    persist<MyPotStore>(
        (set) => ({
            MyPotContent: [],
            setMyPotContent: (MyPotContent) => set({ MyPotContent }),
            MyAppliedPotContent: [],
            setMyAppliedPotContent: (MyAppliedPotContent) => set({ MyAppliedPotContent }),
            TotalMyPotContent: [],
            setTotalMyPotContent: (TotalMyPotContent) => set({ TotalMyPotContent }),
        }),
        {
            name: 'myPotContent-storage',
            getStorage: () => sessionStorage,
        },
    ),
);
