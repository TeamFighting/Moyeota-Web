import { create } from 'zustand';

interface AuthStore {
    accessToken: string;
    setAccessToken: (token: string) => void;
}

export const AuthStore = create<AuthStore>((set) => ({
    accessToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4IiwiZXhwIjoxNzA3Mjg3ODU4fQ.y4Vw9DwS-kxFlVK8kdJYZFaGeD5P3q0Rbcptu2SIeI8',
    setAccessToken: (token: string) => set(() => ({ accessToken: token })),
}));
