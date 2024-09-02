import { useState, useEffect } from 'react';
import instance from '@apis';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ref as dbRef, query, onValue } from 'firebase/database';
import { db } from 'firebase';
import { Chevronleft } from '@assets/svg';
import moment from 'moment';
import { NoneReadChatStore } from '@stores/NoneReadChat';
import { motion, useAnimate, useDragControls, useMotionValue, useTransform } from 'framer-motion';
import { ChatTime } from '@utils/chatTime';
import BottomNav from '@components/BottomNav';

export interface myMessageProps {
    text: string;
    timestamp: number;
    user: {
        id: string;
        name: string;
        profileImage: string;
    };
}
export interface ChatRoomProps {
    roomId: string;
    roomName: string;
    userCount: number;
    createdDate: string;
    postId: number;
}

export interface LastMessageProps extends myMessageProps {
    key: string;
}
moment.locale('ko');
function ChatLists() {
    const [chatRooms, setChatRooms] = useState<ChatRoomProps[]>([]);
    const [roomIds, setRoomIds] = useState<string[]>([]);
    const navigate = useNavigate();
    const { lastMessage, setLastMessage, noneReadChat, lastReadTime, setNoneReadChat, setLastReadTime } =
        NoneReadChatStore();
    const dragControls = useDragControls();
    useEffect(() => {
        totalChatRooms();
        for (let i = 0; i < chatRooms.length; i++) {
            if (lastReadTime[chatRooms[i].roomId] === undefined) {
                setLastReadTime(chatRooms[i].roomId, 0);
            }
        }
    }, []);

    function onMessageArrived(roomId: string, message: myMessageProps) {
        // 메시지의 시간이 마지막으로 읽은 시간 이후인지 확인
        const lastReadTime = NoneReadChatStore.getState().lastReadTime[roomId];
        if (
            message.timestamp > lastReadTime &&
            message.user.id !== JSON.parse(localStorage.getItem('myInfo') as string).id
        ) {
            setNoneReadChat(roomId);
        }
    }

    const totalChatRooms = async () => {
        try {
            const res = await instance.get('/chat-rooms/lists', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (res.status === 200) {
                setChatRooms(res.data.data);
            }
        } catch (e: any) {
            console.log(e);
        }
    };
    // 채팅방에 메시지가 도착할 때 호출

    useEffect(() => {
        chatRooms.map((room) => {
            setRoomIds((prev) => {
                if (!prev.includes(room.roomId)) {
                    return [...prev, room.roomId];
                } else {
                    return prev;
                }
            });
            if (!lastReadTime[room.roomId]) setLastReadTime(room.roomId, 0);
        });
    }, [chatRooms]);

    const handleChatRoom = (roomId: string, postId: number) => {
        navigate(`/chat/${postId}/${roomId}`);
    };

    useEffect(() => {
        const messagesRef = dbRef(db, 'messages');
        const lastMessageListener = query(messagesRef);
        const getLastMessage = onValue(lastMessageListener, (snapshot) => {
            const messages: LastMessageProps[] = [];
            const data = snapshot.val();

            if (snapshot.exists()) {
                for (const key in data) {
                    for (let i = 0; i < roomIds.length; i++) {
                        if (key === roomIds[i]) {
                            const messageKeys = Object.keys(data[key]);
                            const latestKey = messageKeys[messageKeys.length - 1];
                            const latestMessage = data[key][latestKey];
                            messages.push({ ...latestMessage, key });
                        }
                    }
                }
            }
            messages.sort((a, b) => b.timestamp - a.timestamp);
            const isEmpty = Object.keys(lastMessage).length === 0;

            if (isEmpty) {
                setLastMessage(messages);
            } else if (lastMessage[0].timestamp == messages[0].timestamp && lastMessage[0].text == messages[0].text) {
                // console.log('same message');
            } else {
                setLastMessage(messages); // setLastMessage를 사용하여 상태 업데이트
                onMessageArrived(messages[0].key, messages[0]);
            }
        });

        return () => {
            getLastMessage(); // Clean up listener
        };
    }, [roomIds]);

    const { profileImage } = JSON.parse(localStorage.getItem('myInfo') as string);
    const [animateRef] = useAnimate();

    const renderChatRooms = () => {
        if (chatRooms.length === 0) {
            return (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            paddingBottom: '200px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#9A9A9A',
                            textAlign: 'center',
                            fontFamily: 'Pretendard',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: '500',
                        }}
                    >
                        팟 매칭 신청하고 채팅을 시작해봐요 !
                    </div>
                </div>
            );
        } else {
            return (
                lastMessage.length > 0 &&
                chatRooms.length > 0 &&
                lastMessage.map((message, i) => {
                    const chatRoom = chatRooms.find((room) => room.roomId === message.key);
                    if (chatRoom)
                        return (
                            <ChatList key={i}>
                                {chatRooms.map((chatRoom, i) => {
                                    moment.locale('ko');
                                    let time = moment(message.timestamp).fromNow();
                                    if (ChatTime(time) !== undefined) {
                                        time = ChatTime(time);
                                    }
                                    if (chatRoom.roomId === message.key) {
                                        return (
                                            <SwipeableContainer key={i}>
                                                <div
                                                    onClick={() => handleChatRoom(chatRoom.roomId, chatRoom.postId)}
                                                    style={{
                                                        height: '84px',
                                                        display: 'flex',
                                                        gap: '26px',
                                                        width: '100%',
                                                        alignItems: 'center',
                                                        backgroundColor: 'white',
                                                        zIndex: 1,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: '16px',
                                                            height: '100%',
                                                            backgroundColor: 'white',
                                                        }}
                                                    />
                                                    <img
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            borderRadius: '100%',
                                                            objectFit: 'cover',
                                                            border: '3px solid #ededed',
                                                        }}
                                                        src={profileImage}
                                                    />
                                                    <div style={{ flex: 1 }}>
                                                        <motion.div
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                width: '100%',
                                                                justifyContent: 'space-between',
                                                            }}
                                                        >
                                                            <RoomName>{chatRoom.roomName}</RoomName>{' '}
                                                            <Time style={{ whiteSpace: 'nowrap' }}>{time}</Time>
                                                        </motion.div>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                            }}
                                                        >
                                                            <LastestMessage key={i}>
                                                                {message.text == undefined
                                                                    ? '정산하기를 요청했어요...'
                                                                    : message.text}
                                                            </LastestMessage>
                                                            {noneReadChat[chatRoom.roomId] > 0 ? (
                                                                <div
                                                                    style={{
                                                                        fontSize: '12px',
                                                                        borderRadius: '50%',
                                                                        backgroundColor: '#EC5829',
                                                                        width: '20px',
                                                                        height: '20px',
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        color: 'white',
                                                                        fontWeight: 'bold',
                                                                    }}
                                                                >
                                                                    {noneReadChat[chatRoom.roomId]}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '16px',
                                                            height: '100%',
                                                            backgroundColor: 'white',
                                                        }}
                                                    />
                                                </div>
                                            </SwipeableContainer>
                                        );
                                    }
                                })}
                            </ChatList>
                        );
                })
            );
        }
    };

    useEffect(() => {
        renderChatRooms();
    }, [lastMessage]);
    const handleClick = () => {
        navigate('/Mainpage');
    };
    const height = window.innerHeight - 126;
    return (
        <div style={{ height: height, width: '100vw' }}>
            <ChatHeader>
                <Icon>
                    <Chevronleft onClick={handleClick} width={24} height={24} />
                </Icon>
                채팅
            </ChatHeader>
            <Body>{renderChatRooms()}</Body>
            <BottomNav />
        </div>
    );
}

const Icon = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    position: absolute;
    left: 14px;
`;

const SwipeableContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
`;
export const ChatHeader = styled.div`
    height: 63px;
    background-color: white;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    padding: 0 14px;
    z-index: 1;
    justify-content: center;
    position: relative;
`;
const ChatList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    border-bottom: 1px solid #ededed;
    width: 100%;
`;
const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90%;
`;
const RoomName = styled.div`
    color: #0f1828;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 150% */
`;
const Time = styled.div`
    color: var(--Typo-Color_-mini, #5d5d5d);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
`;
const LastestMessage = styled.div`
    color: var(--Typo-Color_, #2c2c2c);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;
export default ChatLists;
