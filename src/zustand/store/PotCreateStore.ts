import create from "zustand";

interface StoreState {
  description: string;
  setDescription: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
  distance: number | null;
  setDistance: (value: number | null) => void;
  destination: string | null;
  setDestination: (value: string | null) => void;
}

const usePotCreateStore = create<StoreState>((set) => ({
  description: "",
  setDescription: (value) => set({ description: value }),
  title: "",
  setTitle: (value) => set({ title: value }),
  distance: null,
  setDistance: (value) => set({ distance: value }),
  destination: null,
  setDestination: (value) => set({ destination: value }),
}));

export default usePotCreateStore;
