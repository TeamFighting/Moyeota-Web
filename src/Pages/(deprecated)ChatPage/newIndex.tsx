import { useEffect, useState } from 'react';
import { Client, over } from 'stompjs';
import SockJS from 'sockjs-client';
import './init';

interface ChatProps {
    senderName: string;
    receiverName: string;
    message: string;
    status: string;
}
let stompClient: Client | null = null;

const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState<ChatProps[]>([]);
    const [tab, setTab] = useState('CHATROOM');
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: '',
    });

    const connect = () => {
        const Sock = new SockJS('https://moyeota.shop/wss');
        stompClient = over(Sock);
        stompClient.connect(onConnected, onError);
        console.log(stompClient);
    };

    const onConnected = () => {
        setUserData({ ...userData, connected: true });
        console.log('onConnect', stompClient);
        if (stompClient != null) {
            console.log(userData.username);
            stompClient.subscribe('/chatroom/public', onMessageReceived);
            stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
            userJoin();
        }
    };

    const userJoin = () => {
        const chatMessage = {
            senderName: userData.username,
            status: 'JOIN',
        };
        if (stompClient != null) {
            stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onMessageReceived = (payload: any) => {
        const payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case 'JOIN':
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case 'MESSAGE':
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onPrivateMessage = (payload: any) => {
        console.log(payload);
        const payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            const list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onError = (err: any) => {
        console.log(err);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMessage = (event: any) => {
        const { value } = event.target;
        setUserData({ ...userData, message: value });
    };
    const sendValue = () => {
        if (stompClient) {
            const chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: 'MESSAGE',
            };
            console.log(chatMessage);
            stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: '' });
        }
    };

    const sendPrivateValue = () => {
        if (stompClient) {
            const chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: 'MESSAGE',
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: '' });
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUsername = (event: any) => {
        const { value } = event.target;
        setUserData({ ...userData, username: value });
    };

    const registerUser = () => {
        connect();
    };
    return (
        <div className="container">
            {userData.connected ? (
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li
                                onClick={() => {
                                    setTab('CHATROOM');
                                }}
                                className={`member ${tab === 'CHATROOM' && 'active'}`}
                            >
                                Chatroom
                            </li>
                            {[...privateChats.keys()].map((name, index) => (
                                <li
                                    onClick={() => {
                                        setTab(name);
                                    }}
                                    className={`member ${tab === name && 'active'}`}
                                    key={index}
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {tab === 'CHATROOM' && (
                        <div className="chat-content">
                            <ul className="chat-messages">
                                {publicChats.map((chat, index) => (
                                    <li
                                        className={`message ${chat.senderName === userData.username && 'self'}`}
                                        key={index}
                                    >
                                        {chat.senderName !== userData.username && (
                                            <div className="avatar">{chat.senderName}</div>
                                        )}
                                        <div className="message-data">{chat.message}</div>
                                        {chat.senderName === userData.username && (
                                            <div className="avatar self">{chat.senderName}</div>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <div className="send-message">
                                <input
                                    type="text"
                                    className="input-message"
                                    placeholder="enter the message"
                                    value={userData.message}
                                    onChange={handleMessage}
                                />
                                <button type="button" className="send-button" onClick={sendValue}>
                                    send
                                </button>
                            </div>
                        </div>
                    )}
                    {tab !== 'CHATROOM' && (
                        <div className="chat-content">
                            <ul className="chat-messages">
                                {[...privateChats.get(tab)].map((chat, index) => (
                                    <li
                                        className={`message ${chat.senderName === userData.username && 'self'}`}
                                        key={index}
                                    >
                                        {chat.senderName !== userData.username && (
                                            <div className="avatar">{chat.senderName}</div>
                                        )}
                                        <div className="message-data">{chat.message}</div>
                                        {chat.senderName === userData.username && (
                                            <div className="avatar self">{chat.senderName}</div>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <div className="send-message">
                                <input
                                    type="text"
                                    className="input-message"
                                    placeholder="enter the message"
                                    value={userData.message}
                                    onChange={handleMessage}
                                />
                                <button type="button" className="send-button" onClick={sendPrivateValue}>
                                    send
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="register">
                    <input
                        id="user-name"
                        placeholder="Enter your name"
                        name="userName"
                        value={userData.username}
                        onChange={handleUsername}
                        // margin="normal"
                    />
                    <button type="button" onClick={registerUser}>
                        connect
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatRoom;
