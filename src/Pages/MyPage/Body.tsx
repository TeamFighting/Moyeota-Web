import { PencilIcon } from '../../assets/svg';
import * as S from './MyPage_styles';
type Props = {
    userId: number;
};

function Body() {
    const userInfo = JSON.parse(localStorage.getItem('myInfo') || '{}');
    let gender = '남자';
    if (userInfo.gender == 'F') gender = '여자';
    let age = userInfo.age[0];
    if (age == '1') age = '10대';
    else if (age == '2') age = '20대';
    else if (age == '3') age = '30대';
    else if (age == '4') age = '40대';
    else if (age == '5') age = '50대';
    else age = '60대 이상';
    return (
        <S.ProfileWrapper>
            <S.ProfileImage src={userInfo.profileImage} />
            <S.ProfileInfo>
                <S.ProfileNameRow>
                    <S.ProfileName>{userInfo.nickName ?? userInfo.name}</S.ProfileName>
                    <PencilIcon width={20} height={20} />
                </S.ProfileNameRow>
                <S.Tags>
                    <S.Tag>{gender}</S.Tag> <S.Tag>{age}</S.Tag>
                </S.Tags>
            </S.ProfileInfo>
        </S.ProfileWrapper>
    );
}

export default Body;
