import { CancelIcon, WhiteCancelIcon } from '../../../../assets/svg';
import * as S from './ModifyNickname_styles';

interface BodyProps {
    userInfo: string | null;
}
interface UserInfoData {
    profileImage: string;
    nickname: string;
    name: string;
    age: string;
    id: number;
    gender: string;
}
function Body({ userInfo }: BodyProps) {
    if (userInfo == null) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
        return;
    }
    const userInfoData: UserInfoData = JSON.parse(userInfo);
    const { name, nickname, age, gender } = userInfoData;
    let newage: string = '';
    if (age === '10-19') {
        newage = '10대';
    } else if (age === '20-29') {
        newage = '20대';
    } else if (age === '30-39') {
        newage = '30대';
    } else if (age === '40-49') {
        newage = '40대';
    } else if (age === '50-50') {
        newage = '50대';
    } else if (age === '60-69') {
        newage = '60대';
    } else if (age === '70-79') {
        newage = '70대';
    } else if (age === '80-89') {
        newage = '80대';
    }

    let gen: string = '남자';
    if (gender == 'F') gen = '여자';

    return (
        <S.BodyWrapper>
            <S.BodyExplain>
                <S.Title>프로필을 설정해주세요</S.Title>
                <S.Text>
                    사진과 닉네임, 성별, 나이대가 공개돼요 <br />
                    합승할 파티원에게 보여줄 프로필을 설정해보세요
                </S.Text>
            </S.BodyExplain>
            <S.UserInfo>
                <S.Icon>
                    <img style={{ width: '84px', height: '84px' }} src={userInfoData.profileImage} alt="profile" />
                </S.Icon>
                <S.Tags>
                    <S.Tag>{gen}</S.Tag>
                    <S.Tag>{newage}</S.Tag>
                </S.Tags>
            </S.UserInfo>
            <S.StyledInputWrapper>
                <S.StyledInput defaultValue={nickname ?? name} />
                <S.Icon
                    style={{
                        border: 'none',
                        backgroundColor: '#9A9A9A',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <WhiteCancelIcon width={14} style={{ stroke: 'white' }} />
                </S.Icon>
            </S.StyledInputWrapper>
            <S.ButtonWrapper>저장하기</S.ButtonWrapper>
        </S.BodyWrapper>
    );
}

export default Body;
