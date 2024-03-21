import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type QuickMathDestinationStore = {
    destination: string;
    setDestination: (destination: string) => void;
};

export const useQuickMathDestinationStore = create<QuickMathDestinationStore>((set) => ({
    destination: '',
    setDestination: (destination) => set({ destination }),
}));
