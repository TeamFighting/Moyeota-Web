import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

function ChatList() {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    useEffect(() => {
        const client = new Client({
            brokerURL: 'wss://moyeota.shop/wss-stomp',
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {
                client.subscribe('/sub/chatRoom/1', (message) => {
                    console.log(message);
                });
            },
        });

        client.activate();
        setStompClient(client);
        // 클린업 함수를 반환합니다.
        return () => {
            client.deactivate();
        };
    }, []);

    const sendMessage = () => {
        if (stompClient !== null) {
            const chatMessage = {
                message: '테스트입니다',
            };
            stompClient.publish({
                destination: '/pub/chat/enter/users/8/chat-rooms/1',
                body: JSON.stringify(chatMessage),
            });
        }
    };

    return <div></div>;
}

export default ChatList;
