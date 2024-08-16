import { create } from 'zustand';

interface EditDeleteBottomSheetStore {
    isEditDeleteBottomSheetOpen: boolean;
    openEditDeleteBottomSheet: () => void;
    closeEditDeleteBottomSheet: () => void;
}

const useModalStore = create<EditDeleteBottomSheetStore>((set) => ({
    isEditDeleteBottomSheetOpen: false,
    openEditDeleteBottomSheet: () => set({ isEditDeleteBottomSheetOpen: true }),
    closeEditDeleteBottomSheet: () => set({ isEditDeleteBottomSheetOpen: false }),
}));

export default useModalStore;
