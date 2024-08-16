import Profile from './SingleProfile';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ISOto12 from '@utils/ISOto12';
import getDays from '@utils/getDays';
import createAgo from '@utils/createAgo';
import { useQuickPotStore } from '@stores/QuickPotStore';
import useStore from '@stores/ContentStore';
import { useMyPotContentStore } from '@stores/MyPotContentStore';
import { ArrowRight, LocationMarker, Clock } from '@assets/svg';
import * as S from '../style';

function SingleContent({ from }: { from: string }) {
    const navigate = useNavigate();
    const { totalData } = useStore((state) => state);
    const navigateToDetail = (postId: number) => {
        navigate(`/detailpage/${postId}`);
    };
    const { quickPot } = useQuickPotStore();
    const { MyPotContent, MyAppliedPotContent, TotalMyPotContent } = useMyPotContentStore();

    let fromPot;
    if (from == 'Total' && TotalMyPotContent.length > 0) {
        fromPot = TotalMyPotContent;
    } else if (from == 'MyPot' && MyAppliedPotContent.length > 0) {
        fromPot = MyPotContent;
    } else if (from == 'AppliedPot' && MyAppliedPotContent.length > 0) {
        fromPot = MyAppliedPotContent;
    } else {
        if (quickPot.length !== 0) {
            fromPot = quickPot;
        } else {
            fromPot = totalData;
        }
    }
    return fromPot.map((data, index: number) => {
        const splitedTime = getDays(data.departureTime);
        const timePart = ISOto12(data.departureTime);
        const ago = createAgo(data.createAt);
        const postId = data.postId;

        return (
            <S.SingleContent
                key={index}
                onClick={() => {
                    navigateToDetail(postId);
                }}
            >
                <Profile
                    profileImg={data.profileImage}
                    ago={ago}
                    index={index}
                    userName={data.userName}
                    gender={data.userGender}
                    distance={data.distance}
                />
                <S.ContentTitle>{data.title}</S.ContentTitle>
                <div key={index}>
                    <S.Info>
                        <S.Route>
                            <LocationMarker width={16} height={16} />
                            <S.From> {data.departure} </S.From>
                            <ArrowRight width={16} height={16} />
                            <S.To> {data.destination} </S.To>
                        </S.Route>
                        <S.Time>
                            <Clock width={16} height={16} />
                            <S.StartTime>
                                {splitedTime[1]}월{splitedTime[2]}일 ({splitedTime[3]}) {timePart} 출발
                            </S.StartTime>
                        </S.Time>
                    </S.Info>
                    <S.Line />
                    <Bottom>
                        <Tags>
                            <Tag>{data.vehicle}</Tag>
                            {!data.sameGenderStatus && <Tag>성별무관</Tag>}
                            {data.sameGenderStatus && data.userGender == '남' && <Tag>남자만</Tag>}
                            {data.sameGenderStatus && data.userGender == '여' && <Tag>여자만</Tag>}
                            <Tag>{data.category}</Tag>
                        </Tags>
                        <Status>
                            {data.status === 'RECRUITING' && (
                                <GaterStatus>
                                    모집중 {data.numberOfParticipants} / {data.numberOfRecruitment}
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
    padding: 8px 15px;
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
