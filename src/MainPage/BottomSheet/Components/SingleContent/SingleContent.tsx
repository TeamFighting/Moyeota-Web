import * as S from '../../../style';
import Profile from './Profile';
import ArrowRight from '../../../../../public/svg/ArrowRight.svg';
import LocationMarker from '../../../../../public/svg/LocationMarker.svg';
import Clock from '../../../../../public/svg/Clock.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../../zustand/store/ContentStore';
// import { useEffect, useState } from 'react';

function SingleContent() {
  // const [isTotalDataHere, setIsTotalDataHere] = useState(false);
  const navigate = useNavigate();

  const navigateToDetail = () => {
    navigate('/detailpage');
  };

  const { totalData } = useStore((state) => state);

  return totalData.map((data, index) => {
    const month = data.departureTime.slice(5, 7);
    const date = data.departureTime.slice(8, 10);

    const days = ['일', '월', '화', '수', '목', '금', '토'];

    const newDate = new Date(data.departureTime); // 요일을 영어로 얻기 위함
    const day = days[newDate.getDay()];

    let timePart = data.departureTime.match(/\d{2}:\d{2}/)[0];
    const hour = timePart.split(':')[0];
    const minute = timePart.split(':')[1];

    if (hour < 12) {
      timePart = '오전 ' + hour + ':' + minute;
    } else {
      timePart = '오후 ' + (hour - 12) + ':' + minute;
    }
    return (
      <S.SingleContent onClick={navigateToDetail}>
        <Profile
          index={index}
          userName={data.userName}
          userGender={data.userGender}
        />
        <S.ContentTitle>{data.title}</S.ContentTitle>
        <div key={index}>
          <S.Info>
            <S.Route>
              <LocationMarker />
              <S.From> {data.departure} </S.From>
              <ArrowRight />
              <S.To> {data.destination} </S.To>
            </S.Route>
            <S.Time>
              <Clock />
              <S.StartTime>
                {/* {data.departureTime} */}
                {month}월{date}일 ({day}) {timePart} 출발
                {/* 8월 15일 (화) 오전 11:30 출발 */}
              </S.StartTime>
            </S.Time>
          </S.Info>
          <S.Line />
          <Bottom>
            <Tags>
              <Tag>{data.vehicle}</Tag>
              {!data.sameGenderStatus && <Tag>성별무관</Tag>}
              {data.sameGenderStatus && data.userGender && <Tag>여자만</Tag>}
              {data.sameGenderStatus && !data.userGender && <Tag>남자만</Tag>}
              <Tag>{data.category}</Tag>
            </Tags>
            <Status>
              {data.status === 'RECRUITING' && (
                <GaterStatus>
                  모집중 {data.numberOfParticipants} /{' '}
                  {data.numberOfRecruitment}
                </GaterStatus>
              )}
            </Status>
          </Bottom>
        </div>
      </S.SingleContent>
    );
  });
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
