import { useState, useEffect } from 'react';
import { instance } from '../../axios';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ref as dbRef, child, onChildAdded, limitToLast, query, off, orderByChild, onValue } from 'firebase/database';
import { db } from '../../firebase';
import { Chevronleft, Plus } from '../../assets/svg';
import moment from 'moment';
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
    roomId: string;
    roomName: string;
    userCount: number;
    createdDate: string;
    postId: number;
}

interface LastMessageProps extends myMessageProps {
    key: string;
}
moment.locale('ko');
function ChatLists() {
    const [chatRooms, setChatRooms] = useState<ChatRoomProps[]>([]);
    const [roomIds, setRoomIds] = useState<string[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        totalChatRooms();
    }, []);
    const totalChatRooms = async () => {
        const res = await instance.get('/chat-rooms/lists', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setChatRooms(res.data.data);
    };

    useEffect(() => {
        chatRooms.map((room) => {
            setRoomIds((prev) => {
                if (!prev.includes(room.roomId)) {
                    return [...prev, room.roomId];
                } else {
                    return prev;
                }
            });
        });
    }, [chatRooms]);

    const handleChatRoom = (roomId: string, postId: number) => {
        navigate(`/chat/${postId}`, { state: { roomId: roomId, postId: postId } });
    };
    const messagesRef = dbRef(db, 'messages');

    // const lastMessageQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(1));
    const lastMessageListener = query(messagesRef);
    const lastMessage: LastMessageProps[] = [];
    onValue(lastMessageListener, (snapshot) => {
        const messages = [];
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log(data);

            for (const key in data) {
                for (let i = 0; i < roomIds.length; i++) {
                    if (key === roomIds[i]) {
                        messages.push(data[key]);
                    }
                }
            }

            for (let i = 0; i < messages.length; i++) {
                const data = messages[i];
                let latestData = null;
                let latestTimestamp = -Infinity;
                for (const key in data) {
                    if (data[key].timestamp > latestTimestamp) {
                        latestTimestamp = data[key].timestamp;
                        latestData = data[key];
                    }
                }
                lastMessage.push(latestData);
            }
        } else {
            console.log('No messages found');
        }
    });
    console.log('lastMessage:', lastMessage);
    const { profileImage } = JSON.parse(localStorage.getItem('myInfo') as string);
    const renderChatRooms = () => {
        lastMessage.sort((a, b) => b.timestamp - a.timestamp);
        return (
            chatRooms.length > 0 &&
            lastMessage.map((message, i) => {
                return (
                    <ChatList key={i}>
                        {chatRooms.map((chatRoom, i) => {
                            moment.locale('ko');
                            let time = moment(message.timestamp).fromNow();
                            if (time === 'a few seconds ago') time = '방금 전';
                            if (time === 'a day ago') time = '어제';
                            if (time === 'a month ago') time = '한달 전';
                            if (time === 'a year ago') time = '작년';
                            if (time === 'a minute ago') time = '1분 전';
                            if (time.match(/minutes ago/)) time = time.replace('minutes ago', '분 전');
                            if (time.match(/hours ago/)) time = time.replace('hours ago', '시간 전');
                            if (time.match(/days ago/)) time = time.replace('days ago', '일 전');
                            if (time.match(/months ago/)) time = time.replace('months ago', '달 전');
                            if (time.match(/years ago/)) time = time.replace('years ago', '년 전');

                            console.log(time);
                            if (chatRoom.roomId === message.key)
                                return (
                                    <div
                                        onClick={() => handleChatRoom(chatRoom.roomId, chatRoom.postId)}
                                        style={{
                                            height: '84px',
                                            display: 'flex',
                                            gap: '26px',
                                            width: '100%',
                                            alignItems: 'center',
                                        }}
                                    >
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
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <RoomName>{chatRoom.roomName}</RoomName>{' '}
                                                <Time style={{ whiteSpace: 'nowrap' }}>{time}</Time>
                                            </div>
                                            <LastestMessage key={i}>{message.text}</LastestMessage>
                                        </div>
                                    </div>
                                );
                        })}
                    </ChatList>
                );
            })
        );
    };
    return (
        <div>
            <ChatHeader>
                <Chevronleft width={24} height={24} />
                채팅
                <Plus width={18} height={18} />
            </ChatHeader>
            <Body>{renderChatRooms()}</Body>
        </div>
    );
}
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
    padding-left: 20px;
    border-bottom: 1px solid #ededed;
    width: 84%;
`;
const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    width: 100%;
`;
export default ChatLists;
