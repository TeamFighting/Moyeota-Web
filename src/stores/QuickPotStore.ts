import { create } from 'zustand';

interface QuickPotStore {
    quickPot: any[];
    setQuickPot: (quickPot: any[]) => void;
    clearQuickPot: () => void;
}

export const useQuickPotStore = create<QuickPotStore>((set) => ({
    quickPot: [],
    setQuickPot: (quickPot: any[]) => set({ quickPot }),
    clearQuickPot: () => set({ quickPot: [] }),
}));
