type MyPotType = {
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

type accountDtoList = {
    accountNumber: string;
    bankName: string;
};
type MyInfo = {
    name: string;
    age: string;
    averageStarRate: number | null;
    email: string | null;
    loginId: string | null;
    nickName: string | null;
    phoneNumber: string | null;
    profileImage: string;
    userId: number;
    school: string | null;
    status: string;
    gender: string;
    accountDtoList: accountDtoList[];
    setMyInfo: (data: MyInfo) => void;
};
