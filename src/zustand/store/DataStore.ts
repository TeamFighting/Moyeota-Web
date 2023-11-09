import { create } from "zustand";

interface DataStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  totalData: any[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateTotalData: (data: any[]) => void;
}

const DataStore = create<DataStore>((set) => ({
  totalData: [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateTotalData: (data: any[]) => set({ totalData: data }),
}));

export default DataStore;
