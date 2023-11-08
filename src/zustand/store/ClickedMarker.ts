import { create } from "zustand";

type ClickedMarkerState = {
  clickedMarkerId: number;
  isClicked: boolean;
  setClickedMarker: (id: number) => void;
};

export const useClickedMarker = create<ClickedMarkerState>((set) => ({
  clickedMarkerId: -1,
  isClicked: false,
  setClickedMarker: (id) => set({ clickedMarkerId: id, isClicked: true }),
}));
