import { create } from 'zustand';
interface DestinationMarkerClickInfo {
    title: string;
    position: {
        lat: string;
        lng: string;
    };
}

interface DestinationMarkerClickProps {
    clickedDestinationMarker: DestinationMarkerClickInfo | null;
    setClickedDestinationMarker: (clickedDestinationMarker: DestinationMarkerClickInfo | null) => void;
}

export const DestinationMarkerClickStore = create<DestinationMarkerClickProps>((set) => ({
    clickedDestinationMarker: null,
    setClickedDestinationMarker: (clickedDestinationMarker: DestinationMarkerClickInfo | null) =>
        set({ clickedDestinationMarker }),
}));
