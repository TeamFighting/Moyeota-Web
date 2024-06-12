import * as S from './style';
function Body() {
    return (
        <div>
            <S.ManageAccountWrapper>
                <S.Title>개인정보 수정</S.Title>
                <S.BasicInfo>
                    <S.InfoWrapper>
                        <S.SubTitle>사용자명</S.SubTitle>
                        <S.Info>이효린</S.Info>
                    </S.InfoWrapper>
                    <S.InfoWrapper>
                        <S.SubTitle>이메일</S.SubTitle>
                        <S.BTN>
                            <S.EmailInput type="email" />
                        </S.BTN>
                    </S.InfoWrapper>
                </S.BasicInfo>
            </S.ManageAccountWrapper>
            <div
                style={{
                    height: '6px',
                    backgroundColor: '#F5F6F8',
                }}
            />
            <S.ManageAccountWrapper style={{ marginTop: '32px' }}>
                <S.Title>계정 관리</S.Title>
                <S.ManageAccount>
                    <S.BTN>로그아웃</S.BTN>
                    <S.BTN>회원탈퇴</S.BTN>
                    <S.BTN>수정하기</S.BTN>
                </S.ManageAccount>
            </S.ManageAccountWrapper>
        </div>
    );
}

export default Body;
