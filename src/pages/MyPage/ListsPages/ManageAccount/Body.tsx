import { useState } from 'react';
import { WhiteCancelIcon } from '../../../../assets/svg';
import { useMyInfoStore } from '../../../../stores/MyInfo';
import * as S from './style';
import instance from '@apis/index';
import { UseGetNewAccessToken } from '../../../../hooks/useGetNewAccessToken';
function Body() {
    const { email, name } = useMyInfoStore();

    const [newEmail, setNewEmail] = useState(email ?? '');
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.target.value);
    };

    const modifyEmail = async () => {
        try {
            const res = await instance.put(
                'users/info',
                {
                    email: newEmail,
                },
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                },
            );
            if (res.status === 200) {
                alert('이메일이 변경되었습니다.');
            }
        } catch (e: any) {
            if (e.response.status === 401) {
                if (await UseGetNewAccessToken(localStorage.getItem('accessToken')!)) {
                    modifyEmail();
                } else {
                    window.location.href = '/login';
                }
            }
        }
    };

    return (
        <div>
            <S.ManageAccountWrapper>
                <S.Title style={{ marginBottom: '32px' }}>개인정보 수정</S.Title>
                <S.BasicInfo>
                    <S.InfoWrapper>
                        <S.SubTitle>사용자명</S.SubTitle>
                        <S.Info style={{}}>{name}</S.Info>
                    </S.InfoWrapper>
                    <S.InfoWrapper>
                        <S.SubTitle>이메일</S.SubTitle>
                        <S.BTN>
                            <S.EmailInput onChange={handleEmailChange} type="email" defaultValue={email ?? ''} />
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
                    <S.BTN>로그아웃</S.BTN>
                    <S.BTN>회원탈퇴</S.BTN>
                    <S.BTN onClick={modifyEmail}>수정하기</S.BTN>
                </S.ManageAccount>
            </S.ManageAccountWrapper>
        </div>
    );
}

export default Body;
