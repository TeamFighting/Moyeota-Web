import { create } from "zustand";

type QuickPotStore = {
  quickPot: object[];
  setQuickPot: (quickPot: object[]) => void;
};

export const useQuickPotStore = create<QuickPotStore>((set) => ({
  quickPot: [],
  setQuickPot: (quickPot: object[]) => set({ quickPot }),
}));
