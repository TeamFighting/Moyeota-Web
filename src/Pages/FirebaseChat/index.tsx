import { Chevronleft, VerticalMenu } from '../../assets/svg';
import SvgCancelIcon from '../../assets/svg/CancelIcon';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { instance } from '../../axios';
import { GreenSendBtn } from '../../assets/svg';
import * as S from './style';
import { db } from '../../firebase';
import { serverTimestamp, set, ref as dbRef, push, child, onChildAdded } from 'firebase/database';
import Messages from './Messages';
import moment from 'moment';
import 'moment/locale/ko';
import Skeleton from '../../components/Skeleton';
import { showProfileTime } from '../util/showProfileTime';
import { NoneReadChatStore } from '../../state/store/NoneReadChat';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FirebaseChat() {
    const location = useLocation();
    const { postId, roomId } = location.state;
    const [postInfo, setPostInfo] = useState<ChatPageProps>({} as ChatPageProps);
    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<myMessageProps[]>([]);
    const [messagesLoading, setMessagesLoading] = useState<boolean>(true);

    const { id, name, profileImage } = JSON.parse(localStorage.getItem('myInfo') as string);
    const { setLastReadTime, setNoneReadChat, setResetNoneReadChat } = NoneReadChatStore.getState();
    const navigate = useNavigate();
    const handleBack = () => {
        leaveChatRoom(roomId);
        navigate('/ChatLists');
    };
    const messageEndRef = useRef<HTMLDivElement>(null);
    const messagesRef = dbRef(db, 'messages');

    useEffect(() => {
        async function getChatRoom() {
            const response = await instance.get(`/posts/${postId}`);
            setPostInfo(response.data.data);
        }
        getChatRoom();
    }, []);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (roomId !== undefined) addMessagesListener(roomId);
    }, [roomId]);

    function leaveChatRoom(roomId: string) {
        setLastReadTime(roomId, Date.now());
        setNoneReadChat(roomId, 0);
    }

    const addMessagesListener = (roomId: string) => {
        const messagesArray = [] as myMessageProps[];
        onChildAdded(child(messagesRef, roomId), (snapshot) => {
            messagesArray.push(snapshot.val());
            const newmessagesArray = [...messagesArray];
            setMessages(newmessagesArray);
        });
        setMessagesLoading(false);
    };
    const createMessage = () => {
        if (newMessage === '') return;
        const message = {
            key: roomId,
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

    const renderMessages = (messages: myMessageProps[]) => {
        return (
            messages.length > 0 &&
            messages.map((items, index) => {
                let timeValue = moment(items.timestamp).format('HH:mm');
                let hour = Number(timeValue.substr(0, 2));
                const { displayTime, displayProfile } = showProfileTime({ index, items, messages, timeValue });

                if (hour > 12) {
                    hour = hour - 12;
                    timeValue = '오후 ' + hour + timeValue.substr(2, 3);
                } else {
                    timeValue = '오전 ' + timeValue;
                }
                return (
                    <Messages
                        key={index}
                        displayTime={displayTime}
                        displayProfile={displayProfile}
                        timeStamp={timeValue}
                        message={items.text}
                        user={items.user}
                    />
                );
            })
        );
    };
    const renderMessageSkeleton = (messagesLoading: boolean) => {
        return (
            { messagesLoading } && (
                <>
                    {[...Array(15)].map((_, index) => (
                        <Skeleton key={index} />
                    ))}
                </>
            )
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
                {renderMessageSkeleton(messagesLoading)}
                {renderMessages(messages)}
                <div ref={messageEndRef}></div>
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
                    <div
                        style={{
                            marginRight: '13px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                        }}
                        onClick={sendMessage}
                    >
                        <GreenSendBtn width="24px" />
                    </div>
                </S.InputWrapper>
            </S.Bottom>
        </>
    );
}

export default FirebaseChat;
