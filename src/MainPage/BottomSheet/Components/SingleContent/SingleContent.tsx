import * as S from '../../../style';
import Profile from './Profile';
import ArrowRight from '../../../../../public/svg/ArrowRight.svg';
import LocationMarker from '../../../../../public/svg/LocationMarker.svg';
import Clock from '../../../../../public/svg/Clock.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function SingleContent() {
  const navigate = useNavigate();

  const navigateToDetail = () => {
    navigate('/detailpage');
  };

  return (
    <S.SingleContent onClick = {navigateToDetail}>
      <Profile />
      <S.ContentTitle>공덕팟</S.ContentTitle>
      <S.Info>
        <S.Route>
          <LocationMarker />
          <S.From> 공덕역 5호선 </S.From>
          <ArrowRight />
          <S.To> 공덕역 6호선 </S.To>
        </S.Route>
        <S.Time>
          <Clock />
          <S.StartTime>08월 15일 (화) 오전 11:30 출발 </S.StartTime>
        </S.Time>
      </S.Info>
      <S.Line />
      <Bottom>
        <Tags>
          <Tag>일반택시</Tag>
          <Tag>성별무관</Tag>
          <Tag>출퇴근</Tag>
        </Tags>
        <Status>
          <GaterStatus>모집중 1/4</GaterStatus>
        </Status>
      </Bottom>
    </S.SingleContent>
  );
}

export default SingleContent;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 18px;
  margin-left: 22px;
  align-items: center;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
`;
const Tag = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: #7e7e7e;
  display: flex;
  margin-right: 9px;
  border-radius: 4px;
  background-color: #f5f6f8;
  padding: 2px 4px;
`;
const Status = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
`;
const GaterStatus = styled.div`
  color: var(--Green-Text, #139b59);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 157%; /* 18.84px */
  border-radius: 4px;
  border: 1px solid #ebebeb;
  padding: 3px 11px;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-right: 15px;
`;
