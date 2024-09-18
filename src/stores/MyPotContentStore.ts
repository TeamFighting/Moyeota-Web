import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
