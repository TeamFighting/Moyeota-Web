import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    postId: number;
    setPostId: (value: number) => void;
}

const PotCreateStore = create<StoreState>((set) => ({
    description: '',
    title: '',
    distance: 0,
    destination: null,
    totalPeople: 1,
    VehicleType: '일반',
    sameGenderRide: 'NO',
    selectedTime: '',
    postId: 0,
    setDescription: (value) => set({ description: value }),
    setTitle: (value) => set({ title: value }),
    setDistance: (value) => set({ distance: value }),
    setDestination: (value) => set({ destination: value }),
    setTotalPeople: (value: number) => set({ totalPeople: value }),
    setVehicleType: (value) => set({ VehicleType: value }),
    setSameGenderRide: (value) => set({ sameGenderRide: value }),
    setSelectedTime: (value) => set({ selectedTime: value }),
    setPostId: (value: number) => set({ postId: value }),
}));

export default PotCreateStore;
