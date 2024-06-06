import Header from '../Header';
import Body from './Body';
import * as S from './ModifyNickname_styles';
function ModifyNickname() {
    return (
        <S.ModifyNicknameWrapper style={{ width: '100%', height: '100%' }}>
            <Header title={'프로필 수정'} />
            <Body />
        </S.ModifyNicknameWrapper>
    );
}

export default ModifyNickname;
