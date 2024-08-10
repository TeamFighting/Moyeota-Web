import { create } from 'zustand';

type State = {
    accountName: string;
    accountNumber: string;
    clickedAccountList: boolean;
    setAccountName: (accountName: string) => void;
    setAccountNumber: (accountNumber: string) => void;
    setClickedAccountList: (clickedAccountList: boolean) => void;
};

export const useAccountStore = create<State>((set) => ({
    accountName: '',
    accountNumber: '',
    clickedAccountList: false,
    setClickedAccountList: (clickedAccountList: boolean) => set({ clickedAccountList }),
    setAccountName: (accountName: string) => set({ accountName }),
    setAccountNumber: (accountNumber: string) => set({ accountNumber }),
}));
