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
import Messages from './Messages';
import moment from 'moment';
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
    const { id, name, profileImage } = JSON.parse(localStorage.getItem('myInfo') as string);
    console.log('MYINFO', id, profileImage);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    const messagesRef = dbRef(db, 'messages');

    useEffect(() => {
        if (roomId !== undefined) addMessagesListener(roomId);
        // return () => {
        //     off(messagesRef);
        // };
    }, [roomId]);
    const addMessagesListener = (roomId: string) => {
        const messagesArray = [] as myMessageProps[];
        onChildAdded(child(messagesRef, roomId), (snapshot) => {
            messagesArray.push(snapshot.val());
            const newmessagesArray = [...messagesArray];
            setMessages(newmessagesArray);
        });
        setMessagesLoading(true);
    };
    const createMessage = (fileUrl: string | null = null) => {
        const message = {
            text: newMessage,
            user: {
                id: id,
                name: name,
                profileImage: profileImage,
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
    const { id: ids } = JSON.parse(localStorage.getItem('myInfo') as string);
    console.log(ids);

    const renderMessages = (messages: myMessageProps[]) => {
        return (
            messages.length > 0 &&
            messages.map((items, index) => {
                let displayTime = true;
                const timeValue = items.timestamp;
                const newtimeValue = moment(timeValue).format('HH:mm');
                if (index !== messages.length - 1) {
                    // 마지막 인덱스가 아닐 때만 실행.
                    const isSamePerson = items.user.id === messages[index + 1].user.id;
                    if (isSamePerson) {
                        const nextTimeValue = moment(messages[index + 1].timestamp).format('HH:mm');
                        console.log(nextTimeValue == newtimeValue);
                        if (nextTimeValue == newtimeValue) displayTime = false;
                    }
                }
                return (
                    <Messages
                        displayTime={displayTime}
                        timeStamp={newtimeValue}
                        message={items.text}
                        user={items.user}
                    />
                );
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
            <S.Body>{renderMessages(messages)}</S.Body>
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
