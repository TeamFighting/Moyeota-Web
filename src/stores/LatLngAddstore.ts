import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LatLngAddStore {
    currentLat: number;
    currentLng: number;
    currentAdd?: string;
    setLatLngAdd: (currentLat: number, currentLng: number, currentAdd?: string) => void;
    removeAll: () => void;
}

const LatLngAddStore = create(
    persist<LatLngAddStore>(
        (set) => ({
            currentLat: 37.6294657,
            currentLng: 127.0807685,
            currentAdd: '',
            setLatLngAdd: (Lat, Lng, currentAdd) =>
                set(() => ({ currentLat: Lat, currentLng: Lng, currentAdd: currentAdd })),
            removeAll: () => set(() => ({ currentLat: 0, currentLng: 0, currentAdd: '' })),
        }),
        {
            name: 'LatLngAddStore',
            getStorage: () => sessionStorage,
        },
    ),
);

export default LatLngAddStore;
