import create from "zustand";

interface PostDataStoreState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPostData: (data: any[]) => void;
}

const usePostDataStore = create<PostDataStoreState>((set) => ({
  data: [],
  setPostData: (data) => set({ data }),
}));

export default usePostDataStore;
