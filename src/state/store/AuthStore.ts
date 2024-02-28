import { create } from 'zustand';

interface AuthStore {
    accessToken: string;
    setAccessToken: (token: string) => void;
}

export const AuthStore = create<AuthStore>((set) => ({
    accessToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNSIsImV4cCI6MTcwOTU2OTQyNn0.oUeDuvpNMaXspU0W-MM74Rsjd5mWZRwgRt2O9Pp0nkU',
    setAccessToken: (token: string) => set(() => ({ accessToken: token })),
}));
