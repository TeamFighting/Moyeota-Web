import { create } from "zustand";

// export type QuickPot = {
//   category: string;
//   content: string;
//   createAt: string;

// };
interface QuickPotStore {
   
  quickPot: any[];
   
  setQuickPot: (quickPot: any[]) => void;
}

export const useQuickPotStore = create<QuickPotStore>((set) => ({
  quickPot: [],
   
  setQuickPot: (quickPot: any[]) => set({ quickPot }),
}));
