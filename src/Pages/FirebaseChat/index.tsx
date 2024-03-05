import { Chevronleft, VerticalMenu } from '../../assets/svg';
import SvgCancelIcon from '../../assets/svg/CancelIcon';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { instance } from '../../axios';
import { GreenSendBtn } from '../../assets/svg';
import * as S from './style';
import { db } from '../../firebase';
import { serverTimestamp, set, ref as dbRef, push, update, child, onChildAdded, off } from 'firebase/database';
import styled from 'styled-components';
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

interface myMessageProps {
    text: string;
    timestamp: number;
    user: {
        id: string;
        name: string;
        profileImage: string;
    };
}

interface ChatRoomProps {
    id: string;
    postId: string;
    createdBy: {
        name: string;
    };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FirebaseChat() {
    const location = useLocation();
    const { postId, roomId } = location.state;
    const [postInfo, setPostInfo] = useState<ChatPageProps>({} as ChatPageProps);
    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<myMessageProps[]>([]);
    const [messagesLoading, setMessagesLoading] = useState<boolean>(true);
    const { id, name } = JSON.parse(localStorage.getItem('myInfo') as string);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    const messagesRef = dbRef(db, 'messages');

    useEffect(() => {
        if (roomId !== undefined) addMessagesListener(roomId);
        return () => {
            off(messagesRef);
        };
    }, [roomId]);
    const addMessagesListener = (roomId: string) => {
        const messagesArray = [] as myMessageProps[];
        onChildAdded(child(messagesRef, roomId), (snapshot) => {
            messagesArray.push(snapshot.val());
            const newmessagesArray = [...messagesArray];
            setMessages(newmessagesArray);
        });
    };
    const createMessage = (fileUrl: string | null = null) => {
        const message = {
            text: newMessage,
            user: {
                id: id,
                name: name,
                profileImage: postInfo.profileImage,
            },
            timestamp: serverTimestamp(),
        };

        return message;
    };

    const sendMessage = async () => {
        try {
            if (roomId === undefined) return;
            await set(push(child(messagesRef, roomId)), createMessage());
            setNewMessage('');
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        async function getChatRoom() {
            const response = await instance.get(`/posts/${postId}`);
            setPostInfo(response.data.data);
        }
        getChatRoom();
    }, []);

    const renderMessages = (messages: myMessageProps[]) => {
        console.log(messages);

        return (
            messages.length > 0 &&
            messages.map((items, index) => {
                return <Message key={index}>{items.text}</Message>;
            })
        );
    };
    return (
        <>
            <S.Header>
                <S.Icon style={{ alignSelf: 'center' }} onClick={handleBack}>
                    <Chevronleft width="24" height="24" />
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                        <S.Profile>
                            <S.ProfileImg src={postInfo.profileImage} alt="profile" />
                        </S.Profile>
                        <S.Title style={{ textAlign: 'center' }}>{postInfo.title}</S.Title>
                    </div>
                </S.Icon>
                <S.Icon style={{ alignSelf: 'center', display: 'flex', gap: '18px' }}>
                    <VerticalMenu width="24" height="24" />
                    <SvgCancelIcon width="24" height="24" />
                </S.Icon>
            </S.Header>
            <S.Body>
                {renderMessages(messages)}
                {/* {messages.map((items, index) => {
                    let displayTime = true;
                    const timeValue = items.time;
                    if (index !== messages.length - 1) {
                        // 마지막 인덱스가 아닐 때만 실행.
                        const nextTimeValue = messages[index + 1].time;
                        if (nextTimeValue === timeValue) displayTime = false;
                        // 다음 메세지와 시간이 같을 경우는 띄우지 않는다.
                    }
                    return (
                        <div
                            style={{
                                gap: '8px',
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                height: 'fit-content',
                                marginRight: '25px',
                                marginBottom: '10px',
                            }}
                        >
                            {displayTime ? (
                                <div
                                    style={{
                                        fontSize: '10px',
                                        color: 'var(--Gray-Text-3, #7E7E7E)',
                                        height: '100%',
                                        verticalAlign: 'bottom',
                                        display: 'flex',
                                        alignItems: 'end',
                                    }}
                                >
                                    {items.time}
                                </div>
                            ) : null}
                            <S.MyMessage key={index}>{items.message}</S.MyMessage>
                        </div>
                    );
                })} */}
            </S.Body>
            <S.Bottom>
                <S.InputWrapper>
                    <S.StyledInput
                        placeholder="메시지 보내기..."
                        onChange={(e) => {
                            setNewMessage(e.target.value);
                        }}
                        value={newMessage}
                        type="text"
                    />
                    <div onClick={sendMessage}>
                        <GreenSendBtn width="24px" />
                    </div>
                </S.InputWrapper>
            </S.Bottom>
        </>
    );
}

const Message = styled.div`
    font-size: 10px;
    color: var(--Gray-Text-3, #7e7e7e);
    height: 100%;
    vertical-align: bottom;
    display: flex;
    align-items: end;
`;

export default FirebaseChat;
