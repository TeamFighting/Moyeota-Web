import { useState, useEffect } from 'react';
import { instance } from '../../axios';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ref as dbRef, query, onValue } from 'firebase/database';
import { db } from '../../firebase';
import { Chevronleft, Plus } from '../../assets/svg';
import moment from 'moment';
import { NoneReadChatStore } from '../../state/store/NoneReadChat';
import { motion, useAnimate, useDragControls, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
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
            // console.log('new ');
            setNoneReadChat(roomId);
        }
    }

    const totalChatRooms = async () => {
        const res = await instance.get('/chat-rooms/lists', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setChatRooms(res.data.data);
        // console.log('chatRooms', res.data.data);
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
        navigate(`/chat/${postId}`, { state: { roomId: roomId, postId: postId } });
    };

    useEffect(() => {
        const messagesRef = dbRef(db, 'messages');
        const lastMessageListener = query(messagesRef);
        // console.log(lastMessage);
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
    const itemx = useMotionValue(0);
    const bgColor = useTransform(itemx, [-82, 0, 82], ['white', 'blue', 'white']);
    const [animateRef, animate] = useAnimate();
    const [isLeaveShow, setIsLeaveShow] = useState(false);
    const leaveChatRoomState = isLeaveShow ? 'appear' : 'disappear';
    useEffect(() => {
        itemx.on('change', (v) => {
            setIsLeaveShow(v < -41);
            console.log(v);
        });
    }, [itemx.get()]);

    const renderChatRooms = () => {
        return (
            lastMessage.length > 0 &&
            chatRooms.length > 0 &&
            lastMessage.map((message, i) => {
                const chatRoom = chatRooms.find((room) => room.roomId === message.key);
                if (chatRoom)
                    return (
                        <ChatList>
                            {chatRooms.map((chatRoom, i) => {
                                moment.locale('ko');
                                let time = moment(message.timestamp).fromNow();
                                if (time === 'a few seconds ago') time = '방금 전';
                                if (time === 'in a few seconds') time = '방금 전';
                                if (time === 'a day ago') time = '어제';
                                if (time === 'a month ago') time = '한달 전';
                                if (time === 'a year ago') time = '작년';
                                if (time === 'a minute ago') time = '1분 전';
                                if (time === 'an hour ago') time = '1시간 전';
                                if (time.match(/minutes ago/)) time = time.replace('minutes ago', '분 전');
                                if (time.match(/hours ago/)) time = time.replace('hours ago', '시간 전');
                                if (time.match(/days ago/)) time = time.replace('days ago', '일 전');
                                if (time.match(/months ago/)) time = time.replace('months ago', '달 전');
                                if (time.match(/years ago/)) time = time.replace('years ago', '년 전');

                                if (chatRoom.roomId === message.key) {
                                    return (
                                        <SwipeableContainer key={i}>
                                            <motion.div
                                                ref={animateRef}
                                                dragControls={dragControls}
                                                dragConstraints={{ left: -82, right: 0 }}
                                                drag="x"
                                                onDragEnd={() => {
                                                    const isOverThreshold = itemx.get() < -41;
                                                    animate(animateRef.current, {
                                                        x: isOverThreshold ? -82 : 0,
                                                    });
                                                }}
                                                onClick={() => handleChatRoom(chatRoom.roomId, chatRoom.postId)}
                                                style={{
                                                    // x: itemx,
                                                    height: '84px',
                                                    display: 'flex',
                                                    gap: '26px',
                                                    width: '100%',
                                                    alignItems: 'center',
                                                    backgroundColor: bgColor,
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
                                                        <LastestMessage key={i}>{message.text}</LastestMessage>
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
                                            </motion.div>
                                            <LeaveChatRoom initial="disappear" animate={leaveChatRoomState}>
                                                삭제
                                            </LeaveChatRoom>
                                        </SwipeableContainer>
                                    );
                                }
                            })}
                        </ChatList>
                    );
            })
        );
    };

    useEffect(() => {
        renderChatRooms();
    }, [lastMessage]);
    const handleClick = () => {
        navigate('/Mainpage');
    };
    return (
        <div>
            <ChatHeader>
                <Chevronleft onClick={handleClick} width={24} height={24} />
                채팅
                <Plus width={18} height={18} />
            </ChatHeader>
            <Body>{renderChatRooms()}</Body>
        </div>
    );
}
const LeaveChatRoom = styled(motion.div)`
    background-color: #ec5829;
    display: grid;
    place-content: center;
    height: 100%;
    width: 82px;
    position: absolute;
    top: 0;
    right: 0;
    aspect-ratio: 1 /1;
    background: red;
    color: #fff;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 28.26px */
    z-index: -1;
`;
const SwipeableContainer = styled(motion.div)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
`;
const ChatHeader = styled.div`
    height: 63px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;
    padding: 0 14px;
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
    justify-content: center;
    /* margin: 0 16px; */
`;
const RoomName = styled.div`
    color: #0f1828;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    /* white-space: nowrap; */
    line-height: 24px; /* 150% */
`;
const Time = styled.div`
    color: var(--Typo-Color_-mini, #5d5d5d);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 19.2px */
`;
const LastestMessage = styled.div`
    color: var(--Typo-Color_, #2c2c2c);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;
export default ChatLists;
