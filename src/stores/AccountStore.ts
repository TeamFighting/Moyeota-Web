import { create } from 'zustand';

type State = {
    accountName: string | null;
    accountNumber: string | null;
    isOpenedAccountList: boolean;
    setAccountName: (accountName: string) => void;
    setAccountNumber: (accountNumber: string) => void;
    setIsOpenedAccountList: (clickedAccountList: boolean) => void;
    clearAccount: () => void;
};

export const useAccountStore = create<State>((set) => ({
    accountName: null,
    accountNumber: null,
    isOpenedAccountList: false,
    setIsOpenedAccountList: (clickedAccountList: boolean) => set({ isOpenedAccountList: clickedAccountList }),
    setAccountName: (accountName: string) => set({ accountName }),
    setAccountNumber: (accountNumber: string) => set({ accountNumber }),
    clearAccount: () => set({ accountName: null, accountNumber: null }),
}));
