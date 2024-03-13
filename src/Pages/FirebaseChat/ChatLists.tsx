import { useState, useEffect } from 'react';
import { instance } from '../../axios';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ref as dbRef, child, onChildAdded, limitToLast, query, off, orderByChild, onValue } from 'firebase/database';
import { db } from '../../firebase';
import { Chevronleft, Plus } from '../../assets/svg';
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
        console.log(res.data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setChatRooms(res.data.data);
    };

    useEffect(() => {
        chatRooms.map((room) => {
            setRoomIds((prev) => [...prev, room.roomId]);
        });
    }, [chatRooms]);

    const handleChatRoom = (roomId: string, postId: number) => {
        navigate(`/chat/${postId}`, { state: { roomId: roomId, postId: postId } });
    };
    const messagesRef = dbRef(db, 'messages');

    const lastMessageQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(1));
    onValue(lastMessageQuery, (snapshot) => {
        let messages = [];
        if (snapshot.exists()) {
            const data = snapshot.val();
            const lastMessageKey = Object.keys(data)[0];
            messages = Object.values(data[lastMessageKey]);
            console.log(messages);

            messages = Object.keys(data[lastMessageKey]).map((key) => data[key]);
        } else {
            console.log('No messages found');
        }
    });

    const renderChatRooms = () => {
        return (
            chatRooms.length > 0 &&
            chatRooms.map((chatRoom, i) => {
                return (
                    <ChatList key={i} onClick={() => handleChatRoom(chatRoom.roomId, chatRoom.postId)}>
                        {chatRoom.roomName}
                    </ChatList>
                );
            })
        );
    };
    return (
        <div>
            <ChatHeader>
                <Chevronleft width={24} height={24} />
                알림
                <Plus width={18} height={18} />
            </ChatHeader>

            {renderChatRooms()}
        </div>
    );
}
const ChatHeader = styled.div`
    height: 63px;
    background-color: aliceblue;
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
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 20px;
    border-bottom: 1px solid #f1f1f1;
`;
export default ChatLists;
