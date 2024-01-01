/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface ContentStore {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    totalData: any[];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateTotalData: (data: any[]) => void;
}

const ContentStore = create<ContentStore>((set) => ({
    totalData: [
        {
            numberOfParticipants: 1,
            numberOfRecruitment: 2,
            fare: 10000,
            duration: 30,
            postId: 1,
            userName: '김민수',
            title: '제목',
            content: '내용',
            profileImage: 'https://i.imgur.com/0LKZQYM.png',
            userGender: true,
            createAt: '2021-10-08T06:50:25.000Z',
            view: 100,
            departure: '서울과학기술대학교 어의관',
            destination: '서울과학기술대학교 어의관',
            departureTime: '2021-10-08T06:50:25.000Z',
        },
    ],
    updateTotalData: (data: any[]) => set((state) => ({ totalData: [...state.totalData, ...data] })),
}));

export default ContentStore;
