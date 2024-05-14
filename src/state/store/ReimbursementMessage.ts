import { create } from 'zustand';

interface EachAmountProps {
    userId: number;
    amount: number;
    name: string;
}
interface MessageProps {
    account: { bankName: string; accountNumber: string };
    potName: string;
    postId: number;
    totalAmount: string;
    EachAmount: EachAmountProps[];
    totalPeople: number;
}
interface ReimbursementMessageStore {
    reimbursementMessage: MessageProps;
    setReimbursementMessage: (reimbursementMessage: MessageProps) => void;
    setEachAmount: (eachAmount: EachAmountProps[]) => void;
}
export const useReimbursementMessageStore = create<ReimbursementMessageStore>((set) => ({
    reimbursementMessage: {
        account: { bankName: '', accountNumber: '' },
        potName: '',
        postId: 0,
        totalAmount: '',
        EachAmount: [],
        totalPeople: 0,
    },
    setEachAmount: (eachAmount: EachAmountProps[]) =>
        set((state) => ({
            reimbursementMessage: {
                ...state.reimbursementMessage,
                EachAmount: eachAmount,
            },
        })),
    setReimbursementMessage: (reimbursementMessage: MessageProps) => set({ reimbursementMessage }),
}));
