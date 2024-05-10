import { create } from 'zustand';

interface MessageProps {
    account: { bankName: string; accountNumber: string };
    potName: string;
    postId: number;
    totalAmount: string;
    EachAmount: object[];
    totalPeople: number;
}
interface ReimbursementMessageStore {
    reimbursementMessage: MessageProps;
    setReimbursementMessage: (reimbursementMessage: MessageProps) => void;
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
    setReimbursementMessage: (reimbursementMessage: MessageProps) => set({ reimbursementMessage }),
}));
