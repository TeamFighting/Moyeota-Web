import { create } from 'zustand';

interface ClickedBottomTab {
    clicked: string;
    setClicked: (tab: string) => void;
}

export const ClickedBottomTab = create<ClickedBottomTab>((set) => ({
    clicked: 'home',
    setClicked: (tab: string) => set(() => ({ clicked: tab })),
}));
