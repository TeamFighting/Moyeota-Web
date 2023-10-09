import create from 'zustand';

interface ContentStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  totalData: any[];
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateTotalData: (data: any[]) => void;
}

const ContentStore = create<ContentStore>((set) => ({
  totalData: [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateTotalData: (data: any[]) => set({ totalData: data }),
}));

export default ContentStore;