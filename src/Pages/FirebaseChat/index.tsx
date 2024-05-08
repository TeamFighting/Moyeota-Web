import { Album, Camera, Chevronleft, Reimbursement, VerticalMenu } from '../../assets/svg';
import SvgCancelIcon from '../../assets/svg/CancelIcon';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { instance } from '../../axios';
import * as S from './style';
import { db } from '../../firebase';
import { ref as dbRef, child, onChildAdded } from 'firebase/database';
import Messages from './Messages';
import moment from 'moment';
import 'moment/locale/ko';
import Skeleton from '../../components/Skeleton';
import { showProfileTime } from '../util/showProfileTime';
import { NoneReadChatStore } from '../../state/store/NoneReadChat';
import ChatBottom from './ChatBottom';
import toast, { Toaster } from 'react-hot-toast';

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

function FirebaseChat() {
    const { postId, roomId } = useParams();
    const [postInfo, setPostInfo] = useState<ChatPageProps>({} as ChatPageProps);
    const [messages, setMessages] = useState<myMessageProps[]>([]);
    const [messagesLoading, setMessagesLoading] = useState<boolean>(true);
    const { id, profileImage } = JSON.parse(localStorage.getItem('myInfo') as string);
    const { setLastReadTime, setNoneReadChat } = NoneReadChatStore.getState();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const messagesRef = dbRef(db, 'messages');

    const handleBack = () => {
        if (roomId !== undefined) {
            leaveChatRoom(roomId);
        }
        navigate('/ChatLists');
    };

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
    const notYet = () => {
        toast.error('서비스 준비중이예요', {
            icon: '🚧',
        });
    };

    const navigateReimbursement = () => {
        navigate('/reimbursement/potowner/' + postId + '/' + id);
    };
    if (postId === undefined || roomId == undefined) return;
    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
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
            <S.SlideWrapper isOpen={open}>
                <S.Body>
                    {renderMessageSkeleton(messagesLoading)}
                    {renderMessages(messages)}
                    <div ref={messageEndRef}></div>
                </S.Body>
            </S.SlideWrapper>
            <ChatBottom
                isOpen={open}
                toggleOpen={() => setOpen(!open)}
                roomId={roomId}
                id={id}
                profileImage={profileImage}
            />
            <S.ChatBottomDrawer isOpen={open}>
                <S.ChatBottomDrawerContent>
                    <S.ChatBottomDrawerIcon onClick={notYet}>
                        <Album width={44} height={44} />
                        <S.ChatBottomDrawerIconText>카메라</S.ChatBottomDrawerIconText>
                    </S.ChatBottomDrawerIcon>
                    <S.ChatBottomDrawerIcon onClick={notYet}>
                        <Camera width={44} height={44} />
                        <S.ChatBottomDrawerIconText>앨범</S.ChatBottomDrawerIconText>
                    </S.ChatBottomDrawerIcon>
                    <S.ChatBottomDrawerIcon onClick={navigateReimbursement}>
                        <Reimbursement width={44} height={44} />
                        <S.ChatBottomDrawerIconText>정산</S.ChatBottomDrawerIconText>
                    </S.ChatBottomDrawerIcon>
                </S.ChatBottomDrawerContent>
            </S.ChatBottomDrawer>
        </>
    );
}

export default FirebaseChat;
