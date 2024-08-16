import { useNavigate } from 'react-router';
import { PencilIcon } from '@assets/svg';
import * as S from '../MyPage_styles';
import { useMyInfoStore } from '@stores/MyInfo';

function BodyTop() {
    const userInfo = useMyInfoStore();
    const navigate = useNavigate();
    let gender = '남자';
    if (userInfo.gender == '여') gender = '여자';
    const age = userInfo.age;

    const navigateToEdit = () => {
        const userId = userInfo.userId;
        navigate(`/mypage/modify/${userId}`);
    };
    return (
        <div>
            <S.ProfileWrapper>
                <S.ProfileImage src={userInfo.profileImage} />
                <S.ProfileInfo>
                    <S.ProfileNameRow onClick={navigateToEdit}>
                        <S.ProfileName>{userInfo.nickName ?? userInfo.name}</S.ProfileName>
                        <PencilIcon width={20} height={20} />
                    </S.ProfileNameRow>
                    <S.Tags>
                        <S.Tag>{gender}</S.Tag> <S.Tag>{age}</S.Tag>
                    </S.Tags>
                </S.ProfileInfo>
            </S.ProfileWrapper>
        </div>
    );
}

export default BodyTop;
