import styled from 'styled-components'
import { LionProfile } from '../../../../assets/svg'
import * as S from './style'
import axios from 'axios'
import { useEffect, useState } from 'react'
import usePostDataStore from '../../../../zustand/store/PostDataStore'

interface PARTYINFO {
    userName: string
    profileImage: string
    userGender: boolean
}

function DetailPartySection() {
    const { data } = usePostDataStore()
    const [onlyParty, setonlyParty] = useState<PARTYINFO[]>([])
    const postId = data.postId
    const leaderName = data.userName
    async function getPartyOne(postId: number) {
        try {
            await axios
                .get(`http://moyeota.shop/api/posts/${postId}/members`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_AUTH_BEARER_TEST}`,
                    },
                })
                .then((res) => {
                    // console.log("res", res.data.data);
                    if (res.status == 200) {
                        const partyInfo: PARTYINFO[] = res.data.data
                        const participants = partyInfo.filter((value) => {
                            return value.userName !== leaderName
                        })
                        setonlyParty(participants)
                    }
                })
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getPartyOne(postId)
    }, [postId])
    let gender
    if (!data.userGender) {
        gender = '여자'
    } else {
        gender = '남자'
    }

    return (
        <S.Party>
            <S.Leader>팟장</S.Leader>
            <Wrapper>
                <S.Icon style={{ marginLeft: '24px', marginRight: '13px' }}>
                    v<img src={data.profileImage} width="86px" height="86px" style={{ borderRadius: '100%' }} />
                </S.Icon>
                <S.Name>{leaderName}</S.Name>
                <S.Tags>
                    <S.Tag style={{ marginRight: '7px' }}>{gender}</S.Tag>
                    {/* 나잇대 수정필요 */}
                    <S.Tag>20대</S.Tag>
                </S.Tags>
            </Wrapper>
            <S.Description>{data.content}</S.Description>
            <S.PartyOne>
                <div style={{ flexDirection: 'row', display: 'flex' }}>
                    <S.Leader>파티원</S.Leader>
                    <TagsWrapper>
                        <S.Tags style={{}}>
                            <S.Tag style={{ marginRight: '7px' }}>{data.numberOfParticipants - 1}명</S.Tag>
                        </S.Tags>
                    </TagsWrapper>
                </div>
                {/* 나잇대 수정필요 */}
                {onlyParty.length > 0 ? (
                    onlyParty.map((value, index) => {
                        return (
                            <Wrapper key={index} style={{ paddingBottom: '16px' }}>
                                <S.Icon style={{ marginLeft: '24px', marginRight: '13px' }}>
                                    <LionProfile width="55px" height="55px" />
                                </S.Icon>
                                <S.Name>{value.userName}</S.Name>
                                <S.Tags style={{}}>
                                    <S.Tag style={{ marginRight: '7px' }}>{value.userGender ? '남자' : '여자'}</S.Tag>
                                    {/* 나잇대 수정필요 */}
                                    <S.Tag>20대</S.Tag>
                                </S.Tags>
                            </Wrapper>
                        )
                    })
                ) : (
                    <S.PartyoneText>아직 매칭된 파티원이 없어요!</S.PartyoneText>
                )}
            </S.PartyOne>
        </S.Party>
    )
}
export const Wrapper = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
`

export const TagsWrapper = styled.div`
    flex-direction: row;
    margin-left: 11px;
    margin-top: 16px;
    display: flex;
    align-items: center;
`
export default DetailPartySection
