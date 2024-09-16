import { ArrowRight, LocationMarker, Clock } from '@assets/svg';
import ContentStore from '@stores/ContentStore';
import createAgo from '@utils/createAgo';
import getDays from '@utils/getDays';
import ISOto12 from '@utils/ISOto12';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import * as S from './style';

function MarkerClickContent({ postId }: { postId: number }) {
    const navigate = useNavigate();
    const { totalData } = ContentStore((state) => state);
    const data = totalData.find((data) => data.postId === postId);
    const ago = createAgo(data.createAt);
    const splitedTime = getDays(data.departureTime);
    const timePart = ISOto12(data.departureTime);
    const goToDetail = () => {
        navigate(`/detailPage/${postId}`, {
            state: { data, splitedTime, timePart },
        });
    };

    return (
        <div
            style={{
                justifyContent: 'center',
                alignContent: 'center',
                zIndex: 1000,
                position: 'absolute',
                bottom: '17px',
                right: '50%',
                transform: 'translate(50%, 0)',
            }}
        >
            <BriefWrapper>
                <S.ProfileInfo>
                    <S.ProfileLeft>
                        <img src={data.profileImage} width="24px" height="24px" style={{ borderRadius: '100%' }} />
                        <S.ProfileName style={{ fontSize: '14px', color: 'black' }}>{data.userName}</S.ProfileName>
                        <S.ProfileSex>{data.userGender}</S.ProfileSex>
                        <S.Dot />
                        <S.ProfileTime>{ago}</S.ProfileTime>
                    </S.ProfileLeft>
                    <S.ProfileDistance>{data.distance}km</S.ProfileDistance>
                </S.ProfileInfo>
                <S.ContentTitle>{data.title}</S.ContentTitle>
                <div style={{ fontSize: '14px' }}>
                    <S.Info>
                        <S.Route>
                            <LocationMarker width={16} height={16} />
                            <S.From style={{ overflow: 'visible', whiteSpace: 'nowrap', fontSize: '14px' }}>
                                {' '}
                                {data.departure}{' '}
                            </S.From>
                            <ArrowRight width={16} height={16} />
                            <S.To style={{ overflow: 'visible', whiteSpace: 'nowrap', fontSize: '14px' }}>
                                {' '}
                                {data.destination}{' '}
                            </S.To>
                        </S.Route>
                        <S.Time style={{ overflow: 'visible', whiteSpace: 'nowrap' }}>
                            <Clock width={16} height={16} />
                            <S.StartTime style={{ fontSize: '14px' }}>
                                {splitedTime[1]}월{splitedTime[2]}일 ({splitedTime[3]}) {timePart} 출발
                            </S.StartTime>
                            {data.status === 'RECRUITING' && (
                                <GaterStatus>
                                    모집중 {data.numberOfParticipants} / {data.numberOfRecruitment}
                                </GaterStatus>
                            )}
                        </S.Time>
                    </S.Info>
                    <ShowDetail onClick={goToDetail}>팟 자세히 보기</ShowDetail>
                </div>
            </BriefWrapper>
        </div>
    );
}

const BriefWrapper = styled.div`
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    width: 327px;
    height: 203px;
    background-color: white;
`;

const GaterStatus = styled.div`
    background-color: white;
    color: var(--Green-Text, #139b59);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 18.84px */
    border-radius: 4px;
    border: 1px solid #ebebeb;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 74px;
    height: 24px;
    flex-shrink: 0;
    position: absolute;
    right: 1rem;
`;

const ShowDetail = styled.div`
    width: 299px;
    height: 48px;
    background-color: #1edd81;
    color: white;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 700;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 12px;
    margin: 0 auto;
    margin-top: 13px;
`;
export default MarkerClickContent;
