import create from "zustand";

interface StoreState {
  description: string;
  setDescription: (value: string) => void;
}

const usePotCreateStore = create<StoreState>((set) => ({
  description: "",
  setDescription: (value) => set({ description: value }),
}));

export default usePotCreateStore;
