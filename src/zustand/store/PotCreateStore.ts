import create from "zustand";

interface StoreState {
  description: string;
  setDescription: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
}

const usePotCreateStore = create<StoreState>((set) => ({
  description: "",
  setDescription: (value) => set({ description: value }),
  title: "",
  setTitle: (value) => set({ title: value }),
}));

export default usePotCreateStore;
