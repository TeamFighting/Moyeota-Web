import { create } from "zustand";

interface DurationFareStoreProps {
  estimatedDuration: string | null;
  estimatedFare: number | null;
  setEstimatedDuration: (duration: string | null) => void;
  setEstimatedFare: (fare: number | null) => void;
}

const DurationFareStore = create<DurationFareStoreProps>((set) => ({
  estimatedDuration: null,
  estimatedFare: null,
  setEstimatedDuration: (duration) => set({ estimatedDuration: duration }),
  setEstimatedFare: (fare) => set({ estimatedFare: fare }),
}));

export default DurationFareStore;
