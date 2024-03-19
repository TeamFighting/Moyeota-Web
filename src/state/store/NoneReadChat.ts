import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
interface NoneReadChatProps {
    noneReadChat: { [roomId: string]: number };
    lastReadTime: { [roomId: string]: number };
    setNoneReadChat: (roomId: string, count: number) => void;
    setLastReadTime: (roomId: string, time: number) => void;
}

export const NoneReadChatStore = create(
    persist<NoneReadChatProps>(
        (set) => ({
            noneReadChat: {},
            lastReadTime: {},
            setNoneReadChat: (roomId, count) =>
                set((state) => ({ noneReadChat: { ...state.noneReadChat, [roomId]: count } })),
            setLastReadTime: (roomId, time) =>
                set((state) => ({ lastReadTime: { ...state.lastReadTime, [roomId]: time } })),
        }),
        { storage: createJSONStorage(() => sessionStorage), name: 'noneReadChat' },
    ),
);
