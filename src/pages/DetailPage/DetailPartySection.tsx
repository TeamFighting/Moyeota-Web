import styled from 'styled-components';
import * as S from './style';
import { useEffect, useState } from 'react';
import instance from '@apis';
import { AuthStore } from '@stores/AuthStore';
import { UseGetNewAccessToken } from '@hooks/Auth/useGetNewAccessToken';

interface Props {
    leaderName: string;
    content: string;
    gender: string;
    profileImage: string;
    participants: number;
    postId: number;
}

interface PARTYINFO {
    userName: string;
    profileImage: string;
    userGender: string;
    nickname: string;
    potOwner: boolean;
}

function DetailPartySection({ profileImage, leaderName, content, gender, postId }: Props) {
    let gender2;
    if (gender == 'M') {
        gender2 = '남자';
    } else {
        gender2 = '여자';
    }
    const { accessToken } = AuthStore();
    const [onlyParty, setonlyParty] = useState<PARTYINFO[]>([]);
    async function getPartyOne(postId: number) {
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
            // //console.log(e);
            if (e.response.status === 401) {
                if (await UseGetNewAccessToken(accessToken!)) {
                    getPartyOne(postId);
                } else {
                    alert('로그인이 필요합니다.');
                    window.location.href = '/login';
                }
            }
        }
    }
    useEffect(() => {
        getPartyOne(postId);
    }, [postId]);

    return (
        <S.Party>
            <S.Leader>팟장</S.Leader>
            <Wrapper>
                <S.Icon style={{ marginLeft: '24px', marginRight: '13px' }}>
                    <img style={{ borderRadius: '100%' }} src={profileImage} width="55px" height="55px" />
                </S.Icon>
                <S.Name>{leaderName}</S.Name>
                <S.Tags>
                    <S.Tag style={{ marginRight: '7px' }}>{gender2}</S.Tag>
                    <S.Tag>20대</S.Tag>
                </S.Tags>
            </Wrapper>
            <S.Description>{content}</S.Description>
            <S.PartyOne>
                <div style={{ flexDirection: 'row', display: 'flex' }}>
                    <S.Leader>파티원</S.Leader>
                    <TagsWrapper>
                        <S.Tags style={{}}>
                            <S.Tag style={{ marginRight: '7px' }}>{onlyParty.length - 1}명</S.Tag>
                        </S.Tags>
                    </TagsWrapper>
                </div>
                {/* 나잇대 수정필요 */}
                {onlyParty.length - 1 > 0 ? (
                    onlyParty.map((value, index) => {
                        if (value.potOwner) return null;
                        return (
                            <Wrapper key={index} style={{ paddingBottom: '16px' }}>
                                <S.Icon style={{ marginLeft: '24px', marginRight: '13px' }}>
                                    <img
                                        src={value.profileImage}
                                        style={{ borderRadius: '100%' }}
                                        width="55px"
                                        height="55px"
                                    />
                                </S.Icon>
                                <S.Name>{value.nickname}</S.Name>
                                <S.Tags style={{}}>
                                    <S.Tag style={{ marginRight: '7px' }}>
                                        {value.userGender == 'M' ? '남자' : '여자'}
                                    </S.Tag>
                                    <S.Tag>20대</S.Tag>
                                </S.Tags>
                            </Wrapper>
                        );
                    })
                ) : (
                    <S.PartyoneText>아직 매칭된 파티원이 없어요!</S.PartyoneText>
                )}
            </S.PartyOne>
        </S.Party>
    );
}
export const Wrapper = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
`;

export const TagsWrapper = styled.div`
    flex-direction: row;
    margin-left: 11px;
    margin-top: 16px;
    display: flex;
    align-items: center;
`;
export default DetailPartySection;
