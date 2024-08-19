import { create } from 'zustand';

type ClickedMarkerState = {
    clickedMarkerId: number;
    isMarkerClicked: boolean;
    setClickedMarker: (id: number) => void;
    clearClickedMarker: () => void;
};

export const useClickedMarker = create<ClickedMarkerState>((set) => ({
    clickedMarkerId: -1,
    isMarkerClicked: false,
    setClickedMarker: (id) => set({ clickedMarkerId: id, isMarkerClicked: true }),
    clearClickedMarker: () => set({ clickedMarkerId: -1, isMarkerClicked: false }),
}));
