import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set(() => ({ isOpen })),
}));

export default ModalStore;
