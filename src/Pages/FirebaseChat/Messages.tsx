import { Image } from 'react-bootstrap';
import * as S from './style';
interface MessagesProps {
    timeStamp: string;
    message: string;
    user: {
        id: string;
        name: string;
        profileImage: string;
    };
    displayTime: boolean;
    displayProfile: boolean;
}
function Messages({ displayProfile, displayTime, timeStamp, message, user }: MessagesProps) {
    const { id } = JSON.parse(localStorage.getItem('myInfo') as string);
    return (
        <div>
            {id !== user.id ? (
                <S.YourMessageWrapper>
                    <div style={{ flexDirection: 'column' }}>
                        {displayProfile ? (
                            <div
                                style={{
                                    display: 'flex',
                                    width: '26px',
                                    height: '26px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 100,
                                    border: '3px solid',
                                    borderColor: '#F5F6F8',
                                }}
                            >
                                <div style={{ borderRadius: 100, width: 26, height: 26 }}>
                                    <Image
                                        roundedCircle
                                        style={{ borderRadius: 100, width: 26, height: 26 }}
                                        src={user.profileImage}
                                        alt="profile"
                                    />
                                </div>
                            </div>
                        ) : null}
                        <S.YourTimeWrapper>
                            <S.YourMessage>{message}</S.YourMessage>
                            {displayTime ? <S.Time>{timeStamp}</S.Time> : null}
                        </S.YourTimeWrapper>
                    </div>
                </S.YourMessageWrapper>
            ) : (
                <S.MyMessageWrapper>
                    {displayTime ? <S.Time>{timeStamp}</S.Time> : null}
                    <S.MyMessage> {message}</S.MyMessage>
                </S.MyMessageWrapper>
            )}
        </div>
    );
}

export default Messages;
