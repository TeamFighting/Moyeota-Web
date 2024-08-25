import { create } from 'zustand';

interface PotInfo {
    title: string;
    content: string;
    distance: number;
    destination: string;
    totalPeople: number;
    VehicleType: string;
    sameGenderStatus: string;
    selectedTime: string;
    postId: number;
    departure: string;
    latitude: string;
    longitude: string;
}
interface StoreState {
    content: string;
    setContent: (value: string) => void;
    title: string;
    setTitle: (value: string) => void;
    departure: string;
    setDeparture: (value: string) => void;
    distance: number;
    setDistance: (value: number) => void;
    destination: string;
    setDestination: (value: string) => void;
    totalPeople: number;
    setTotalPeople: (value: number) => void;
    VehicleType: string;
    setVehicleType: (value: string) => void;
    sameGenderStatus: string;
    setSameGenderStatus: (value: string) => void;
    selectedTime: string;
    setSelectedTime: (value: string) => void;
    postId: number;
    setPostId: (value: number) => void;
    clearPotCreateStore: () => void;
    setPotCreateStore: (value: PotInfo) => void;
    latitude: string;
    longitude: string;
    setLatitude: (value: string) => void;
    setLongitude: (value: string) => void;
}

const PotCreateStore = create<StoreState>((set) => ({
    title: '',
    content: '',
    distance: 0,
    destination: '',
    totalPeople: 1,
    VehicleType: '일반',
    sameGenderStatus: 'NO',
    selectedTime: '',
    postId: 0,
    departure: '',
    departureTime: '',
    latitude: '',
    longitude: '',
    setPotCreateStore: (value: PotInfo) =>
        set({
            title: value.title,
            content: value.content,
            distance: value.distance,
            destination: value.destination,
            totalPeople: value.totalPeople,
            VehicleType: value.VehicleType,
            sameGenderStatus: value.sameGenderStatus,
            selectedTime: value.selectedTime,
            postId: value.postId,
            departure: value.departure,
            latitude: value.latitude,
            longitude: value.longitude,
        }),
    setTitle: (value) => set({ title: value }),
    setContent: (value) => set({ content: value }),
    setDistance: (value) => set({ distance: value }),
    setDestination: (value) => set({ destination: value }),
    setTotalPeople: (value: number) => set({ totalPeople: value }),
    setVehicleType: (value) => set({ VehicleType: value }),
    setSameGenderStatus: (value) => set({ sameGenderStatus: value }),
    setSelectedTime: (value) => set({ selectedTime: value }),
    setPostId: (value: number) => set({ postId: value }),
    setDeparture: (value: string) => set({ departure: value }),
    setLatitude: (value: string) => set({ latitude: value }),
    setLongitude: (value: string) => set({ longitude: value }),
    clearPotCreateStore: () =>
        set({
            title: '',
            distance: 0,
            destination: '',
            totalPeople: 1,
            VehicleType: '일반',
            sameGenderStatus: 'NO',
            selectedTime: '',
            postId: 0,
            departure: '',
            latitude: '',
            longitude: '',
        }),
}));

export default PotCreateStore;
