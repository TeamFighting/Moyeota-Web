import styled from 'styled-components';
import { LionProfile } from '../../assets/svg';
import * as S from './style';
import axios from 'axios';
import { useEffect } from 'react';

interface Props {
  leaderName: string;
  content: string;
  gender: boolean;
  profileImage: string;
  participants: number;
}

interface PARTYINFO {
  userName: string;
  profileImage: string;
  userGender: boolean;
}

function DetailPartySection({
  leaderName,
  content,
  gender,
  profileImage,
  participants,
}: Props) {
  let gender2;
  if (gender) {
    gender2 = '남';
  } else {
    gender2 = '여';
  }

  async function getPartyOne() {
    try {
      const res = await axios
        .get(`http://moyeota.shop/api/posts/24/members`, {
          headers: {
            Authorization: `Bearer import.meta.env.VITE_AUTH_BEARER_TOKEN`,
          },
        })
        .then((res) => {
          if (res.data.status == 'SUCCESS') {
            const partyInfo: PARTYINFO[] = res.data;
            partyInfo.forEach((info) => {
              console.log(info.userName);
            });
          }
        });
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getPartyOne();
  }, []);
  return (
    <S.Party>
      <S.Leader>팟장</S.Leader>
      <Wrapper>
        <S.Icon style={{ marginLeft: '24px', marginRight: '13px' }}>
          <LionProfile width="46px" height="46px" />
        </S.Icon>
        <S.Name>{leaderName}</S.Name>
        <S.Tags style={{}}>
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
              <S.Tag style={{ marginRight: '7px' }}>{participants}명</S.Tag>
            </S.Tags>
          </TagsWrapper>
        </div>
        <S.PartyoneText>아직 매칭된 파티원이 없어요!</S.PartyoneText>
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
