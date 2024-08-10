 
import { create } from 'zustand';

interface ContentStore {
     
    totalData: any[];

     
    updateTotalData: (data: any[]) => void;
}

const ContentStore = create<ContentStore>((set) => ({
    totalData: [],
    updateTotalData: (data: any[]) => set(() => ({ totalData: data })),
}));

export default ContentStore;
