import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { IPostInfo, IMessage } from '../constants';
import { NoneReadChatStore } from '@stores/NoneReadChat';
import instance from '@apis';
import { ref as dbRef, child, onChildAdded } from 'firebase/database';
import { db } from 'firebase';

const useChat = () => {
    const { postId, roomId } = useParams();
    const [postInfo, setPostInfo] = useState<IPostInfo>({} as IPostInfo);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [messagesLoading, setMessagesLoading] = useState<boolean>(true);
    const { userId, profileImage } = JSON.parse(localStorage.getItem('myInfo') as string);
    const { setLastReadTime, setNoneReadChat } = NoneReadChatStore.getState();
    const messagesRef = dbRef(db, 'messages');

    function leaveChatRoom(roomId: string) {
        setLastReadTime(roomId, Date.now());
        setNoneReadChat(roomId, 0);
    }

    const addMessagesListener = (roomId: string) => {
        const messagesArray = [] as IMessage[];
        onChildAdded(child(messagesRef, roomId), (snapshot) => {
            messagesArray.push(snapshot.val());
            // console.log(messagesArray);
            const newmessagesArray = [...messagesArray];
            setMessages(newmessagesArray);
        });
        setMessagesLoading(false);
    };

    useEffect(() => {
        async function getChatRoom() {
            const response = await instance.get(`/posts/${postId}`);
            setPostInfo(response.data.data);
        }
        getChatRoom();
    }, [postId]);

    useEffect(() => {
        if (roomId !== undefined) addMessagesListener(roomId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId]);

    return {
        state: {
            postInfo,
            userId,
            postId,
            roomId,
            messages,
            messagesLoading,
            profileImage,
        },
        action: {
            leaveChatRoom,
        },
    };
};

export default useChat;
