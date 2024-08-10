import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
    accessToken: string;
    setAccessToken: (token: string) => void;
}

export const AuthStore = create(
    persist<AuthStore>(
        (set) => ({
            accessToken:
                'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzOSIsImV4cCI6MTcxNDcxNzU4OH0.U2QuxO2SZhMWBlvwJ3awmboRPlsh4uCxOCX5ueeFgZg',
            setAccessToken: (token: string) => set(() => ({ accessToken: token })),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
