import { create } from 'zustand';

interface EditDeleteBottomSheetStore {
    isEditDeleteBottomSheetOpen: boolean;
    openEditDeleteBottomSheet: () => void;
    closeEditDeleteBottomSheet: () => void;
}

const useEditDeleteBottomSheetStore = create<EditDeleteBottomSheetStore>((set) => ({
    isEditDeleteBottomSheetOpen: false,
    openEditDeleteBottomSheet: () => set({ isEditDeleteBottomSheetOpen: true }),
    closeEditDeleteBottomSheet: () => set({ isEditDeleteBottomSheetOpen: false }),
}));

export default useEditDeleteBottomSheetStore;
