import { create } from 'zustand';

export type CurrentLocation = {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    building_name?: string;
    locationTitle?: string;
};

interface CurrentLocationStore {
    currentLocation: CurrentLocation | null;
    setCurrentLocation: (currentLocation: CurrentLocation | null) => void;
}

const CurrentLocationStore = create<CurrentLocationStore>((set) => ({
    currentLocation: null,
    setCurrentLocation: (currentLocation: CurrentLocation | null) =>
        set({
            currentLocation,
        }),
}));

export default CurrentLocationStore;
