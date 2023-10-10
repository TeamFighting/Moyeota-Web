import styled from 'styled-components';
import { LionProfile } from '../../assets/svg';
import * as S from './style';

function DetailPartySection() {
  return (
    <S.Party>
      <S.Leader>팟장</S.Leader>
      <Wrapper>
        <S.Icon style={{ marginLeft: '24px', marginRight: '13px' }}>
          <LionProfile width="46px" height="46px" />
        </S.Icon>
        <S.Name>세빈</S.Name>
        <S.Tags style={{}}>
          <S.Tag style={{ marginRight: '7px' }}>여자</S.Tag>
          <S.Tag>20대</S.Tag>
        </S.Tags>
      </Wrapper>
      <S.Description>
        공덕역 근처 사는 숙대 학생입니다 ㅎㅎ <br />
        판교역 근처로 인턴하고 있어서 같이 타고 <br />
        가실 분 구합니다! 정기적이여도 좋아요~! <br />
        만나는 장소는 채팅으로 정합시다 !!
        <br />
      </S.Description>
      <S.PartyOne>
        <div style={{ flexDirection: 'row', display: 'flex' }}>
          <S.Leader>파티원</S.Leader>
          <TagsWrapper>
            <S.Tags style={{}}>
              <S.Tag style={{ marginRight: '7px' }}>0명</S.Tag>
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
