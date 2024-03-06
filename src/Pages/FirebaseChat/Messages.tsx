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
                <S.TimeWrapper>
                    <div style={{ flexDirection: 'column' }}>
                        {displayProfile ? (
                            <Image
                                roundedCircle
                                style={{ borderRadius: 100, width: 32, height: 32, marginTop: 3 }}
                                src={user.profileImage}
                                alt="profile"
                            />
                        ) : null}
                        <S.TimeWrapper>
                            <S.YourMessage>{message}</S.YourMessage>
                            {displayTime ? <S.Time>{timeStamp}</S.Time> : null}
                        </S.TimeWrapper>
                    </div>
                </S.TimeWrapper>
            ) : (
                <S.TimeWrapper>
                    {displayTime ? <S.Time>{timeStamp}</S.Time> : null}
                    <S.MyMessage> {message}</S.MyMessage>
                </S.TimeWrapper>
            )}
        </div>
    );
}

export default Messages;
