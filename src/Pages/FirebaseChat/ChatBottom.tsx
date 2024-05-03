import { GreenSendBtn } from '../../assets/svg';
import * as S from './style';
import { useRef, useState } from 'react';
import { Chevronleft, Plus, VerticalMenu } from '../../assets/svg';
import SvgCancelIcon from '../../assets/svg/CancelIcon';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { instance } from '../../axios';
import { db } from '../../firebase';
import { serverTimestamp, set, ref as dbRef, push, child, onChildAdded } from 'firebase/database';
import Messages from './Messages';
import moment from 'moment';
import 'moment/locale/ko';

interface ChatBottomProps {
    roomId: string;
    id: string;
    profileImage: string;
}
function ChatBottom({ roomId, id, profileImage }: ChatBottomProps) {
    const messagesRef = dbRef(db, 'messages');
    const inputRef = useRef<HTMLInputElement>(null);
    const [newMessage, setNewMessage] = useState<string>('');
    const createMessage = () => {
        if (newMessage === '') return;
        const message = {
            key: roomId,
            text: newMessage,
            user: {
                id: id,
                name: name,
                profileImage: profileImage,
            },
            timestamp: serverTimestamp(),
        };

        return message;
    };

    const sendMessage = async () => {
        try {
            if (roomId === undefined) return;
            await set(push(child(messagesRef, roomId)), createMessage());
            setNewMessage('');
            inputRef.current?.focus();
        } catch (e) {
            console.log(e);
        }
    };
    const OpenBottomSheet = () => {
        console.log('open bottom sheet');
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div>
            <S.Bottom>
                <S.InputWrapper>
                    <div
                        style={{
                            marginLeft: '13px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                        }}
                        onClick={OpenBottomSheet}
                    >
                        <Plus width="18" height="18" />
                    </div>
                    <S.StyledInput
                        ref={inputRef}
                        placeholder="메시지 보내기..."
                        onChange={(e) => {
                            setNewMessage(e.target.value);
                        }}
                        value={newMessage}
                        type="text"
                        onKeyPress={handleKeyPress}
                    />
                    <div
                        style={{
                            marginRight: '13px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                        }}
                        onClick={sendMessage}
                    >
                        <GreenSendBtn width="24px" />
                    </div>
                </S.InputWrapper>
            </S.Bottom>
        </div>
    );
}

export default ChatBottom;
