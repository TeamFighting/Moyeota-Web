import { GreenSendBtn } from '../../assets/svg';
import * as S from './style';
import { useRef, useState } from 'react';
import { Plus } from '../../assets/svg';
import { db } from '../../firebase';
import { serverTimestamp, set, ref as dbRef, push, child } from 'firebase/database';
import 'moment/locale/ko';

interface ChatBottomProps {
    isOpen: boolean;
    roomId: string;
    id: string;
    profileImage: string;
    toggleOpen: () => void;
}
function ChatBottom({ isOpen, roomId, id, profileImage, toggleOpen }: ChatBottomProps) {
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

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <S.Bottom isOpen={isOpen}>
            <S.InputWrapper>
                <div
                    onClick={toggleOpen}
                    style={{
                        marginLeft: '13px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <Plus className="plus-icon" width="18" height="18" />
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
    );
}

export default ChatBottom;
