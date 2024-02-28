import { Chevronleft, VerticalMenu } from '../../assets/svg';
import SvgCancelIcon from '../../assets/svg/CancelIcon';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { instance } from '../../axios';
// import GreenSendBTN from '../../assets/images/GreenSendBTN.png';
import { GreenSendBtn } from '../../assets/svg';
import * as S from './style';
import getDays from '../util/getDays';
import ISOto12 from '../util/ISOto12';
import { Client } from '@stomp/stompjs';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const [stompClient, setStompClient] = useState<Client | null>(null);
    useEffect(() => {
        const client = new Client({
            brokerURL: 'wss://moyeota.shop/wss-stomp',
            reconnectDelay: 10000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            connectHeaders: {
                login: 'guest',
            },
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {
                client.subscribe('/sub/chatRoom/1', (message) => {
                    console.log(message);
                });
            },
        });

        // 웹소켓 연결 확인 후 상태 업데이트
        if (client) {
            client.activate();
            setStompClient(client);
        }

        // 클린업 함수를 반환합니다.
        return () => {
            // 웹소켓 연결 확인 후 연결 종료
            if (client === null) {
                return;
            }
            client.deactivate();
        };
    }, []);

    const sendMessage = () => {
        if (stompClient !== null) {
            const chatMessage = {
                message: '테스트입니다',
            };
            stompClient.publish({
                destination: '/pub/chat/enter/users/8/chat-rooms/1',
                body: JSON.stringify(chatMessage),
            });
            console.log('보냈음');
        }
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
        }
        getChatRoom();
    }, []);

    const text = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };

    return (
        <>
            <S.Header>
                <S.Icon style={{ alignSelf: 'center', textAlign: 'center' }} onClick={handleBack}>
                    <Chevronleft width="24" height="24" />
                </S.Icon>
                <S.Profile>
                    <S.ProfileImg src={postInfo.profileImage} alt="profile" />
                </S.Profile>
                <S.Title style={{ textAlign: 'center' }}>{postInfo.title}</S.Title>
                <S.Icon style={{ alignSelf: 'center', display: 'flex', gap: '18px' }}>
                    <VerticalMenu width="24" height="24" />
                    <SvgCancelIcon width="24" height="24" />
                </S.Icon>
            </S.Header>
            <S.Body></S.Body>
            <S.Bottom>
                <S.InputWrapper onChange={text} onClick={sendMessage}>
                    <S.StyledInput placeholder="메시지 보내기..." />
                    <GreenSendBtn width="24px" />
                </S.InputWrapper>
            </S.Bottom>
        </>
    );
}

export default ChatPage;
