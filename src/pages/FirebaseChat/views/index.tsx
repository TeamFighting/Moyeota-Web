import { Album, Camera, Chevronleft, Reimbursement, VerticalMenu } from '@assets/svg';
import SvgCancelIcon from '@assets/svg/CancelIcon';
import * as S from './style';
import Messages from './Messages';
import moment from 'moment';
import 'moment/locale/ko';
import Skeleton from '@components/Skeleton';
import { showProfileTime } from '@utils/showProfileTime';
import ChatBottom from './ChatBottom';
import toast, { Toaster } from 'react-hot-toast';
import ChatReimbursement from './Reimbursement';
import useChat from '../hooks/useChat';
import { useNavigate } from 'react-router';
import { ROUTE } from '@constants/route';
import { useEffect, useRef, useState } from 'react';
import type { IMessage } from '../constants';

function FirebaseChat() {
    const {
        state: { userId, postInfo, postId, roomId, messages, messagesLoading, profileImage },
        action: { leaveChatRoom },
    } = useChat();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const messageEndRef = useRef<HTMLDivElement>(null);

    const handleBack = () => {
        if (roomId !== undefined) {
            leaveChatRoom(roomId);
        }
        navigate(ROUTE.CHATLISTS);
    };

    const renderMessages = (messages: IMessage[]) => {
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
                if (items.JSONMessage == undefined) {
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
                } else {
                    const JSONMessage = items.JSONMessage;
                    const user = items.user;
                    return ChatReimbursement({ JSONMessage, user, displayTime, timeValue, navigate });
                }
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
        navigate('/reimbursement/potowner/' + postId + '/' + userId);
    };

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
                userId={userId}
                isOpen={open}
                toggleOpen={() => setOpen(!open)}
                roomId={roomId}
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
