import { create } from 'zustand';

type State = {
    accountName: string;
    accountNumber: string;
    setAccountName: (accountName: string) => void;
    setAccountNumber: (accountNumber: string) => void;
};

export const useAccountStore = create<State>((set) => ({
    accountName: '',
    accountNumber: '',
    setAccountName: (accountName: string) => set({ accountName }),
    setAccountNumber: (accountNumber: string) => set({ accountNumber }),
}));
