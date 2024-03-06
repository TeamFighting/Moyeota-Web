import { useState, useEffect } from 'react';
import { instance } from '../../axios';
import { useNavigate } from 'react-router';
interface ChatRoomProps {
    roomId: string;
    userCount: number;
    createdDate: string;
}
function ChatLists() {
    const [chatRooms, setChatRooms] = useState<ChatRoomProps[]>([]);
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
        console.log(res.data.data);
    };
    const handleChatRoom = (roomId: string) => {
        console.log(roomId);
        navigate(`/chat/${roomId}`, { state: { roomId: roomId } });
    };
    const renderChatRooms = () => {
        return (
            chatRooms.length > 0 &&
            chatRooms.map((chatRoom, i) => {
                return (
                    <ul key={i} onClick={() => handleChatRoom(chatRoom.roomId)}>
                        {chatRoom.roomId}
                    </ul>
                );
            })
        );
    };
    return <div>{renderChatRooms()}</div>;
}

export default ChatLists;
