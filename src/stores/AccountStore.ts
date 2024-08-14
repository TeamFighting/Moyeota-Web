import { create } from 'zustand';

type State = {
    accountName: string;
    accountNumber: string;
    isOpenedAccountList: boolean;
    setAccountName: (accountName: string) => void;
    setAccountNumber: (accountNumber: string) => void;
    setIsOpenedAccountList: (clickedAccountList: boolean) => void;
    clearAccount: () => void;
};

export const useAccountStore = create<State>((set) => ({
    accountName: '',
    accountNumber: '',
    isOpenedAccountList: false,
    setIsOpenedAccountList: (clickedAccountList: boolean) => set({ isOpenedAccountList: clickedAccountList }),
    setAccountName: (accountName: string) => set({ accountName }),
    setAccountNumber: (accountNumber: string) => set({ accountNumber }),
    clearAccount: () => set({ accountName: '', accountNumber: '' }),
}));
