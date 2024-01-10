import { create } from "zustand";

// export type QuickPot = {
//   category: string;
//   content: string;
//   createAt: string;

// };
interface QuickPotStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quickPot: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setQuickPot: (quickPot: any[]) => void;
}

export const useQuickPotStore = create<QuickPotStore>((set) => ({
  quickPot: [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setQuickPot: (quickPot: any[]) => set({ quickPot }),
}));
