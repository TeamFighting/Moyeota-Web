import { create } from 'zustand';

interface DestinationInfo {
    address_name: string | null;
    category_group_code: string | null;
    category_name: string | null;
    distance: string | null;
    id: string | null;
    phone: string | null;
    place_name: string | null;
    place_url: string | null;
    road_address_name: string | null;
    x: string | null;
    y: string | null;
}
interface DestinationResultProps {
    destinationResult: DestinationInfo | null;
    setDestinationResult: (destinationResult: DestinationInfo | null) => void;
    finalDestination: string | null;
    setFinalDestination: (finalDestination: string | null) => void;
}

const DestinationStore = create<DestinationResultProps>((set) => ({
    destinationResult: null,
    setDestinationResult: (destinationResult: DestinationInfo | null) => set({ destinationResult }),
    finalDestination: null,
    setFinalDestination: (finalDestination: string | null) => set({ finalDestination }),
}));

export default DestinationStore;
