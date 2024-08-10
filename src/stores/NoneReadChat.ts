import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { LastMessageProps } from '@pages/FirebaseChat/views/ChatLists';

interface NoneReadChatProps {
    noneReadChat: { [roomId: string]: number };
    lastReadTime: { [roomId: string]: number };
    lastMessage: LastMessageProps[];
    setNoneReadChat: (roomId: string, num?: number) => void;
    setLastReadTime: (roomId: string, time: number) => void;
    setResetNoneReadChat: (roomId: string) => void;
    setLastMessage: (message: LastMessageProps[]) => void;
}

export const NoneReadChatStore = create(
    persist<NoneReadChatProps>(
        (set) => ({
            noneReadChat: {},
            lastReadTime: {},
            lastMessage: [],
            setNoneReadChat: (roomId, num) =>
                set((state) => {
                    return ((num) => {
                        if (num !== undefined && num === 0) {
                            return {
                                noneReadChat: {
                                    ...state.noneReadChat,
                                    [roomId]: 0,
                                },
                            };
                        } else {
                            return {
                                noneReadChat: {
                                    ...state.noneReadChat,
                                    [roomId]: (state.noneReadChat[roomId] || 0) + 1,
                                },
                            };
                        }
                    })(num);
                }),
            setLastReadTime: (roomId, time) =>
                set((state) => ({ lastReadTime: { ...state.lastReadTime, [roomId]: time } })),
            setResetNoneReadChat: (roomId) => {
                set({ noneReadChat: { [roomId]: 0 } });
            },
            setLastMessage: (message) => {
                set({ lastMessage: message });
            },
        }),
        { storage: createJSONStorage(() => sessionStorage), name: 'noneReadChat' },
    ),
);
