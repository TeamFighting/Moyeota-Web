import { create } from 'zustand';

interface DestinationInfo {
    address_name: string;
    category_group_code: string;
    category_name: string;
    distance: string;
    id: string;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: string;
    y: string;
}
interface DestinationResultProps {
    destinationResult: DestinationInfo | null;
    setDestinationResult: (destinationResult: DestinationInfo | null) => void;
    finalDestination: string | null;
    setFinalDestination: (finalDestination: string | null) => void;
    clearDestinationStore: () => void;
}

const DestinationStore = create<DestinationResultProps>((set) => ({
    destinationResult: null,
    setDestinationResult: (destinationResult: DestinationInfo | null) => set({ destinationResult }),
    finalDestination: null,
    setFinalDestination: (finalDestination: string | null) => set({ finalDestination }),
    clearDestinationStore: () => set({ destinationResult: null, finalDestination: null }),
}));

export default DestinationStore;
