import { Chevronleft, VerticalMenu } from '../../assets/svg';
import SvgCancelIcon from '../../assets/svg/CancelIcon';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { instance } from '../../axios';
import { GreenSendBtn } from '../../assets/svg';
import * as S from './style';
import { Client } from '@stomp/stompjs';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChatPage() {
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

  const [, setStompClient] = useState<Client | null>(null);
  useEffect(() => {
    const client = new Client({
      // brokerURL: 'ws://moyeota.site/ws-stomp',
      brokerURL: 'wss://moyeota.site/wss-stomp',
      reconnectDelay: 100000,
      connectHeaders: {
        Authorization: 'Bearer',
      },
      debug: (str) => {
        console.log(str);
      },
      beforeConnect: () => {
        console.log('beforeConnect');
      },
      onConnect: () => {
        console.log('connected');
        // client.subscribe('/sub/chatRoom/1', (message) => {
        //     console.log(message);
        // });
      },
      onStompError: (frame) => {
        console.log('Broker reported error: ' + frame.headers.message);
        console.log('Additional details: ' + frame.body);
      },
    });
    // 웹소켓 연결 확인 후 상태 업데이트
    if (client) {
      client.activate();
      setStompClient(client);
    }

    // 클린업 함수를 반환합니다.
    return () => {
      // 웹소켓 연결 확인 후 연결 종료
      if (client === null) {
        console.log('client is null');
        return;
      }
      client.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (newMessage !== '') {
      const time = new Date().toLocaleTimeString().substr(0, 7);
      // const chatMessage = {
      //     from: '8',
      //     message: newMessage,
      //     roomId: '1',
      //     to: '1',
      // };
      // if (stompClient !== null) {
      //     stompClient.publish({
      //         destination: '/pub/chat/enter/users/8/chat-rooms/1',
      //         body: JSON.stringify(chatMessage),
      //     });
      // }
      setMessages([...messages, { message: newMessage, time: time }]);
      // console.log(chatMessage.message);
      setNewMessage('');
    }
  };

  useEffect(() => {
    async function getChatRoom() {
      const response = await instance.get(`/posts/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
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
        {messages.map((items, index) => {
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
        })}
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

export default ChatPage;
