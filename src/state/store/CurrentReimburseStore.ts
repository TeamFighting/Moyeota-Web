import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IsPayed {
    userId: number;
    isPayed: boolean;
}

interface BodyDataProps {
    isPayed: IsPayed;
    postId: number;
}

interface CurrentReimburseStore {
    CurrentReimbursement: BodyDataProps[];
    setCurrentReimbursement: (CurrentReimbursement: BodyDataProps[]) => void;
    setClearCurrentReimbursement: () => void;
    updatePaymentStatusForUserId: (postId: number, userId: number, isPayed: boolean) => void;
    areAllUsersPayed: () => void;
}

export const CurrentReimburseStore = create(
    persist<CurrentReimburseStore>(
        (set) => ({
            CurrentReimbursement: [],
            setCurrentReimbursement: (CurrentReimbursement) => set({ CurrentReimbursement }),
            setClearCurrentReimbursement: () => set({ CurrentReimbursement: [] }),
            updatePaymentStatusForUserId: (postId: number, userId: number, isPayed: boolean) =>
                set((state) => ({
                    CurrentReimbursement: state.CurrentReimbursement.map((data) =>
                        data.postId === postId
                            ? {
                                  ...data,
                                  isPayed:
                                      data.isPayed.userId === userId
                                          ? { userId: userId, isPayed: isPayed }
                                          : data.isPayed,
                              }
                            : data,
                    ),
                })),
            areAllUsersPayed: () => {
                // CurrentReimbursement.every((data) => data.isPayed.isPayed),
            },
        }),
        {
            name: 'current-reimburse-storage',
        },
    ),
);
