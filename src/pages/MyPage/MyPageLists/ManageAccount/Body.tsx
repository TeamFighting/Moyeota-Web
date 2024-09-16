import { useRef } from 'react';

import * as S from './style';
import { WhiteCancelIcon } from '@assets/svg';
import { useMyInfoStore } from '@stores/MyInfo';
import { handleSignOut, modifyEmail } from '../apis';
import { handleLogout } from '../utils/handleLogout';

function Body() {
    const { email, name } = useMyInfoStore();
    const emailRef = useRef<HTMLInputElement>(null);
    const handleEmailSubmit = () => {
        if (emailRef.current && emailRef.current.value !== email) {
            modifyEmail(emailRef.current.value);
        }
    };
    const alertSignOut = () => {
        if (window.confirm('정말로 탈퇴하시겠습니까?')) {
            handleSignOut();
        }
    };
    return (
        <div>
            <S.ManageAccountWrapper>
                <S.Title style={{ marginBottom: '32px' }}>개인정보 수정</S.Title>
                <S.BasicInfo>
                    <S.InfoWrapper>
                        <S.SubTitle>사용자명</S.SubTitle>
                        <S.Info>{name}</S.Info>
                    </S.InfoWrapper>
                    <S.InfoWrapper>
                        <S.SubTitle>이메일</S.SubTitle>
                        <S.BTN>
                            <S.EmailInput ref={emailRef} type="email" defaultValue={email ?? ''} />
                            <S.IconWrapper style={{ marginRight: '16px' }}>
                                <WhiteCancelIcon width={14} height={14} />
                            </S.IconWrapper>
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
            <S.ManageAccountWrapper>
                <S.Title style={{ marginBottom: '15px' }}>계정 관리</S.Title>
                <S.ManageAccount style={{ gap: '16px' }}>
                    <S.BTN style={{ width: '335px' }} onClick={handleLogout}>
                        로그아웃
                    </S.BTN>
                    <S.BTN style={{ width: '335px' }} onClick={alertSignOut}>
                        회원탈퇴
                    </S.BTN>
                    <S.BTN style={{ width: '335px' }} onClick={handleEmailSubmit}>
                        수정하기
                    </S.BTN>
                </S.ManageAccount>
            </S.ManageAccountWrapper>
        </div>
    );
}

export default Body;
