import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
    appliedParty: Array<{ postId: number; isApplied: boolean }>;
    setAppliedParty: (postId: number) => void;
    deleteAppliedParty: (postId: number) => void;
};

export const useAppliedPartyStore = create(
    persist<State>(
        (set) => ({
            appliedParty: [],
            setAppliedParty: (postId) =>
                set((state) => ({
                    appliedParty: [...state.appliedParty, { postId: postId, isApplied: true }],
                })),
            deleteAppliedParty: (postId) =>
                set((state) => ({
                    appliedParty: [...state.appliedParty.filter((party) => party.postId !== postId)],
                })),
        }),
        {
            name: 'applied-party',
            getStorage: () => localStorage,
        },
    ),
);
