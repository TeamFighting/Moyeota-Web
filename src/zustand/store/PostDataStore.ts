import create from "zustand";

interface PostDataStoreState {
  data: {
    category: string;
    content: string;
    createAt: string;
    departure: string;
    departureTime: string;
    destination: string;
    distance: number;
    duration: number;
    fare: number;
    numberOfParticipants: number;
    numberOfRecruitment: number;
    postId: number;
    profileImage: string;
    sameGenderStatus: string;
    status: string;
    title: string;
    userGender: boolean;
    userName: string;
    vehicle: string;
    view: number;
  };
  setPostData: (data: {
    category?: string;
    content?: string;
    createAt?: string;
    departure?: string;
    departureTime?: string;
    destination?: string;
    distance?: number;
    duration?: number;
    fare?: number;
    numberOfParticipants?: number;
    numberOfRecruitment?: number;
    postId?: number;
    profileImage?: string;
    sameGenderStatus?: string;
    status?: string;
    title?: string;
    userGender?: boolean;
    userName?: string;
    vehicle?: string;
    view?: number;
  }) => void;
}

const usePostDataStore = create<PostDataStoreState>((set) => ({
  data: {
    category: "",
    content: "",
    createAt: "",
    departure: "",
    departureTime: "",
    destination: "",
    distance: 0,
    duration: 0,
    fare: 0,
    numberOfParticipants: 0,
    numberOfRecruitment: 0,
    postId: 0,
    profileImage: "",
    sameGenderStatus: "",
    status: "",
    title: "",
    userGender: false,
    userName: "",
    vehicle: "",
    view: 0,
  },
  setPostData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
}));

export default usePostDataStore;
