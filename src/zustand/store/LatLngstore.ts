import {create} from 'zustand';

interface LatLngStore {
  currentLat: number;
  currentLng: number;
  setLatLng: (currentLat: number, currentLng: number) => void;
  removeAll: () => void;
}

const LatLngStore = create<LatLngStore>((set) => ({
  currentLat: 0,
  currentLng: 0,
  setLatLng: (Lat, Lng) => set(() => ({ currentLat: Lat, currentLng: Lng })),
  removeAll: () => set(() => ({ currentLat: 0, currentLng: 0 })),
}));

export default LatLngStore;
