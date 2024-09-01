import instance from '@apis/index';
import { getAccessToken } from '@utils/getAccessToken';

interface PARTYINFO {
    userName: string;
    profileImage: string;
    userGender: string;
    nickname: string;
    potOwner: boolean;
}

export async function getPartyOne({
    postId,
    leaderName,
    setonlyParty,
}: {
    postId: number | undefined;
    leaderName: string;
    setonlyParty: any;
}) {
    const accessToken = getAccessToken();
    if (postId == undefined) return;
    try {
        await instance
            .get(`/posts/${postId}/members`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then(async (res: any) => {
                if (res.status == 200) {
                    const partyInfo: PARTYINFO[] = res.data.data;
                    const participants = partyInfo.filter((value) => {
                        return value.userName !== leaderName;
                    });
                    setonlyParty(participants);
                }
            });
    } catch (e: any) {
        console.log(e);
    }
}
