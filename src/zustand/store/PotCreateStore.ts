import create from "zustand";

interface StoreState {
  description: string;
  setDescription: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
  distance: number;
  setDistance: (value: number) => void;
  destination: string | null;
  setDestination: (value: string | null) => void;
  totalPeople: number;
  setTotalPeople: (value: number) => void;
  VehicleType: string | null;
  setVehicleType: (value: string | null) => void;
  sameGenderRide: string | null;
  setSameGenderRide: (value: string | null) => void;
  selectedTime: string;
  setSelectedTime: (value: string) => void;
}

const usePotCreateStore = create<StoreState>((set) => ({
  description: "",
  setDescription: (value) => set({ description: value }),
  title: "",
  setTitle: (value) => set({ title: value }),
  distance: 0,
  setDistance: (value) => set({ distance: value }),
  destination: null,
  setDestination: (value) => set({ destination: value }),
  totalPeople: 0,
  setTotalPeople: (value: number) => set({ totalPeople: value }),
  VehicleType: "일반",
  setVehicleType: (value) => set({ VehicleType: value }),
  sameGenderRide: "NO",
  setSameGenderRide: (value) => set({ sameGenderRide: value }),
  selectedTime: "",
  setSelectedTime: (value) => set({ selectedTime: value }),
}));

export default usePotCreateStore;
