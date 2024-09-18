import { create } from 'zustand';

interface ContentStore {
    totalData: MyPotType[];
    updateTotalData: (data: MyPotType[]) => void;
}

const ContentStore = create<ContentStore>((set) => ({
    totalData: [],
    updateTotalData: (data: MyPotType[]) => set(() => ({ totalData: data })),
}));

export default ContentStore;
