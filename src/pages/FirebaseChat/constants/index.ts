export interface IPostInfo {
    postId: string;
    title: string;
    departure: string;
    destination: string;
    createAt: string;
    view: number;
    userName: string;
    userGender: string;
    profileImage: string;
    departureTime: string;
}

export interface IMessage {
    JSONMessage: string;
    text: string;
    timestamp: number;
    user: {
        id: number;
        name: string;
        profileImage: string;
    };
}
