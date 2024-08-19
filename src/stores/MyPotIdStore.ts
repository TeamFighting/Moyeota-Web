import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface MyPotId {
    MyPotId: number[];
    setMyPot: (data: number[]) => void;
}

export const useMyPotIdStore = create(
    persist<MyPotId>(
        (set) => ({
            MyPotId: [0],
            setMyPot: (data: number[]) => set({ MyPotId: data }),
        }),
        {
            name: 'myPot-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
