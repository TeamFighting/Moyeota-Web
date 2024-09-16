import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
    accessToken: string;
    setAccessToken: (token: string) => void;
}

export const AuthStore = create(
    persist<AuthStore>(
        (set) => ({
            accessToken: '',
            setAccessToken: (token: string) => set(() => ({ accessToken: token })),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
