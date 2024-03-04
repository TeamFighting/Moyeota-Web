import { Chevronleft, VerticalMenu } from '../../assets/svg';
import SvgCancelIcon from '../../assets/svg/CancelIcon';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { instance } from '../../axios';
import { GreenSendBtn } from '../../assets/svg';
import * as S from './style';
import { db } from '../../firebase';
import { set, ref, push, update, child, onChildAdded } from 'firebase/database';
interface ChatPageProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    postId: string;
    title: string;
    departure: string;
    destination: string;
    createAt: string;
    view: number;
    userName: string;
    userGender: string;
    profileImage: string;
    departureTime: string;
}

interface myMessageProps {
    message: string;
    time: string;
}

interface ChatRoomProps {
    id: string;
    postId: string;
    createdBy: {
        name: string;
    };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FirebaseChat() {
    const { postId } = useParams();
    const [postInfo, setPostInfo] = useState<ChatPageProps>({} as ChatPageProps);
    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<myMessageProps[]>([
        {
            message: '안녕하세요',
            time: '오전 10:00',
        },
        {
            message: '모여타 채팅 테스트',
            time: '오전 10:00',
        },
        {
            message: '보낸 시간이 같으면',
            time: '오전 10:01',
        },
        {
            message: '시간을 띄우지 않습니다.',
            time: '오전 10:01',
        },
    ]);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    const chatRoomsRef = ref(db, 'chatRooms');
    const [chatRooms, setChatRooms] = useState<ChatRoomProps[]>([]);
    useEffect(() => {
        addChatRoomsListener();
    }, []);
    const addChatRoomsListener = () => {
        const chatRoomsArray: ChatRoomProps[] = [];

        onChildAdded(chatRoomsRef, (DataSnapshot) => {
            chatRoomsArray.push(DataSnapshot.val());
            const newChatRoom = [...chatRoomsArray];
            setChatRooms(newChatRoom);
        });
    };

    const sendMessage = async () => {
        // set(ref(db, `chatRooms/1`), {
        //     name: 'chatRoom',
        //     id: 2,
        // });
    };
    const renderChatRooms = () => {
        return (
            chatRooms.length > 0 &&
            chatRooms.map((chatRoom) => {
                return <div>{chatRoom.id}</div>;
            })
        );
    };
    useEffect(() => {
        async function getChatRoom() {
            const response = await instance.get(`/posts/${postId}`);
            setPostInfo(response.data.data);
        }
        getChatRoom();
    }, []);

    return (
        <>
            <S.Header>
                <S.Icon style={{ alignSelf: 'center' }} onClick={handleBack}>
                    <Chevronleft width="24" height="24" />
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                        <S.Profile>
                            <S.ProfileImg src={postInfo.profileImage} alt="profile" />
                        </S.Profile>
                        <S.Title style={{ textAlign: 'center' }}>{postInfo.title}</S.Title>
                    </div>
                </S.Icon>
                <S.Icon style={{ alignSelf: 'center', display: 'flex', gap: '18px' }}>
                    <VerticalMenu width="24" height="24" />
                    <SvgCancelIcon width="24" height="24" />
                </S.Icon>
            </S.Header>
            <S.Body>
                <ul>{renderChatRooms()}</ul>
                {/* {messages.map((items, index) => {
                    let displayTime = true;
                    const timeValue = items.time;
                    if (index !== messages.length - 1) {
                        // 마지막 인덱스가 아닐 때만 실행.
                        const nextTimeValue = messages[index + 1].time;
                        if (nextTimeValue === timeValue) displayTime = false;
                        // 다음 메세지와 시간이 같을 경우는 띄우지 않는다.
                    }
                    return (
                        <div
                            style={{
                                gap: '8px',
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                height: 'fit-content',
                                marginRight: '25px',
                                marginBottom: '10px',
                            }}
                        >
                            {displayTime ? (
                                <div
                                    style={{
                                        fontSize: '10px',
                                        color: 'var(--Gray-Text-3, #7E7E7E)',
                                        height: '100%',
                                        verticalAlign: 'bottom',
                                        display: 'flex',
                                        alignItems: 'end',
                                    }}
                                >
                                    {items.time}
                                </div>
                            ) : null}
                            <S.MyMessage key={index}>{items.message}</S.MyMessage>
                        </div>
                    );
                })} */}
            </S.Body>
            <S.Bottom>
                <S.InputWrapper>
                    <S.StyledInput
                        placeholder="메시지 보내기..."
                        onChange={(e) => {
                            setNewMessage(e.target.value);
                        }}
                        value={newMessage}
                        type="text"
                    />
                    <div onClick={sendMessage}>
                        <GreenSendBtn width="24px" />
                    </div>
                </S.InputWrapper>
            </S.Bottom>
        </>
    );
}

export default FirebaseChat;
