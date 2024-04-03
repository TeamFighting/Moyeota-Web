import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MyPot {
    MyPot: number[];
    setMyPot: (data: number[]) => void;
}

export const useMyPotStore = create(
    persist<MyPot>(
        (set) => ({
            MyPot: [0],
            setMyPot: (data: number[]) => set({ MyPot: data }),
        }),
        {
            name: 'myPot-storage',
            getStorage: () => localStorage,
        },
    ),
);
