import { useState, useEffect } from 'react';
import { instance } from '../../axios';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ref as dbRef, query, onValue } from 'firebase/database';
import { db } from '../../firebase';
import { Chevronleft, Plus } from '../../assets/svg';
import moment from 'moment';
import { NoneReadChatStore } from '../../state/store/NoneReadChat';
import { motion, useAnimate, useDragControls, useMotionValue, useTransform } from 'framer-motion';
import { ChatTime } from '../util/ChatTime';
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
        console.log('chatRooms', res.data.data);
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
    const [animateRef] = useAnimate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [, setLeaveChatRoomName] = useState<string>('');
    const [leaveChatRoomId, setLeaveChatRoomId] = useState<number>(0);
    const handleleaveChatRoom = (i: number) => {
        setLeaveChatRoomName(chatRooms[i].roomName);
        setLeaveChatRoomId(chatRooms[i].postId);
        setIsModalOpen(true);
    };
    const leaveChatRoom = async (i: number) => {
        const res = await instance.delete(`/chat-rooms/${i}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        setIsModalOpen(false);
        totalChatRooms();
        console.log('leave chat room', res);
    };
    const renderChatRooms = () => {
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
                                            <motion.div
                                                ref={animateRef}
                                                dragControls={dragControls}
                                                dragConstraints={{ left: -82, right: 0 }}
                                                drag="x"
                                                // onDragEnd={() => {
                                                //     const isOverThreshold = itemx.get() < -41;
                                                //     animate(animateRef.current, {
                                                //         x: isOverThreshold ? -82 : 0,
                                                //     });
                                                // }}
                                                onClick={() => handleChatRoom(chatRoom.roomId, chatRoom.postId)}
                                                style={{
                                                    height: '84px',
                                                    display: 'flex',
                                                    gap: '26px',
                                                    width: '100%',
                                                    alignItems: 'center',
                                                    backgroundColor: bgColor,
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
                                            <LeaveChatRoom
                                                initial="disappear"
                                                onClick={() => {
                                                    handleleaveChatRoom(i);
                                                }}
                                            >
                                                나가기
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
        <div style={{ height: '100vh' }}>
            {isModalOpen && (
                <ModalBackGround>
                    <Modal>
                        <div
                            style={{
                                paddingTop: '35px',
                                width: '100%',
                                textAlign: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <div
                                style={{
                                    color: '#343434',
                                    textAlign: 'center',
                                    fontFamily: 'Pretendard',
                                    fontSize: '18px',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    lineHeight: '157%',
                                }}
                            >
                                정말로 나가시겠습니까?
                            </div>
                        </div>
                        <div
                            style={{
                                width: '100%',
                                height: '100px',
                                display: 'flex',
                                gap: '15px',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    height: '48px',
                                    width: '142px',
                                    color: '#5D5D5D',
                                    fontFamily: 'Pretendard',
                                    fontSize: '18px',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    lineHeight: 'normal',
                                    backgroundColor: '#F5F6F8',
                                    borderRadius: '12px',
                                }}
                            >
                                취소
                            </div>
                            <div
                                onClick={() => leaveChatRoom(leaveChatRoomId)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    height: '48px',
                                    width: '142px',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontFamily: 'Pretendard',
                                    fontSize: '18px',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    lineHeight: 'normal',
                                    backgroundColor: '#1EDD81',
                                }}
                            >
                                나가기
                            </div>
                        </div>
                    </Modal>
                </ModalBackGround>
            )}

            <ChatHeader>
                <Chevronleft onClick={handleClick} width={24} height={24} />
                채팅
                <Plus width={18} height={18} />
            </ChatHeader>
            <Body>{renderChatRooms()}</Body>
        </div>
    );
}
const Modal = styled.div`
    position: absolute;
    width: 334px;
    height: 161px;
    z-index: 100;
    display: flex;
    background-color: white;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    border-radius: 10px;
`;
const ModalBackGround = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    display: flex;
`;
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
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 28.26px */
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
    z-index: 1;
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
    /* justify-content: center; */
    /* margin: 0 16px; */
    height: 100%;
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
