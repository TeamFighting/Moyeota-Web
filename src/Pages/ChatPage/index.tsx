import { Chevronleft, Clock, LocationMarker, VerticalMenu } from '../../assets/svg';
import SvgCancelIcon from '../../assets/svg/CancelIcon';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { instance } from '../../axios';
import { Tags } from '../DetailPage/style';
import { Tag } from '../CreatePotPage/Components/DetailPage/style';
import SendBTN from '../../../public/png/SendBTN.png';
import * as S from './style';
import getDays from '../util/getDays';
import ISOto12 from '../util/ISOto12';
interface ChatPageProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

function ChatPage() {
    const { postId } = useParams();
    const [postInfo, setPostInfo] = useState<ChatPageProps>({} as ChatPageProps);

    let splitedTime: string[] = [];
    let timePart: string = '';

    if (postInfo && postInfo.departureTime) {
        splitedTime = getDays(postInfo.departureTime);
        timePart = ISOto12(postInfo.departureTime);
    }

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    useEffect(() => {
        async function getChatRoom() {
            const response = await instance.get(`posts/${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
            });
            setPostInfo(response.data.data);
            console.log(response.data.data);
        }
        getChatRoom();
    }, []);
    return (
        <>
            <S.Header>
                <S.Icon style={{ alignSelf: 'center' }} onClick={handleBack}>
                    <Chevronleft width="24" height="24" />
                </S.Icon>
                <S.Icon style={{ alignSelf: 'center', display: 'flex', gap: '18px' }}>
                    <VerticalMenu width="24" height="24" />
                    <SvgCancelIcon width="24" height="24" />
                </S.Icon>
            </S.Header>
            <S.Body>
                <S.Profile>
                    <S.ProfileImg src={postInfo.profileImage} alt="profile" />
                </S.Profile>
                <S.ProfileName>{postInfo.userName}</S.ProfileName>
                <Tags>
                    <Tag style={{ marginTop: '10px' }}>{postInfo.userGender == 'M' ? '남자' : '여자'}</Tag>
                    <Tag style={{ marginTop: '10px' }}>20대</Tag>
                </Tags>
                <S.Title>{postInfo.title}</S.Title>
                <S.Description>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
                        <S.Icon>
                            <LocationMarker width="14" height="14" />
                        </S.Icon>
                        {postInfo.departure} → {postInfo.destination}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
                        <S.Icon>
                            <Clock width="14" height="14" />
                        </S.Icon>
                        {splitedTime[1]}월 {splitedTime[2]}일 ({splitedTime[3]}) {timePart}출발
                    </div>
                </S.Description>
            </S.Body>
            <S.Bottom>
                <S.InputWrapper>
                    <S.StyledInput placeholder="메시지 보내기..." />
                    <img src={SendBTN} alt="send" style={{ width: '24px', height: '24px' }} />
                </S.InputWrapper>
            </S.Bottom>
        </>
    );
}

export default ChatPage;
