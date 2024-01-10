import { create } from "zustand";
interface BottomSheet {
  isTop: boolean;
  setIsTop: (isOpen: boolean) => void;
}

export const BottomSheetStore = create<BottomSheet>((set) => ({
  isTop: false,
  setIsTop: (isTop) => set(() => ({ isTop })),
}));
