import { create } from 'zustand';

export interface MyPot {
    MyPot: number[];
    setMyPot: (data: number[]) => void;
}

export const useMyPotStore = create<MyPot>((set) => ({
    MyPot: [0],
    setMyPot: (data: number[]) => set({ MyPot: data }),
}));
