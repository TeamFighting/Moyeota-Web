import { useState } from 'react';
import { WhiteCancelIcon } from '../../../../assets/svg';
import instance from '@apis/index';
import * as S from './ModifyNickname_styles';
import { useMyInfoStore } from '../../../../stores/MyInfo';
import { UseGetNewAccessToken } from '../../../../hooks/useGetNewAccessToken';

interface BodyProps {
    userInfo: string | null;
}
interface UserInfoData {
    profileImage: string;
    nickName: string;
    name: string;
    age: string;
    id: number;
    gender: string;
}
function Body({ userInfo }: BodyProps) {
    const { nickName, setMyInfo, name, age, gender } = useMyInfoStore();
    const [nickNameState, setNickNameState] = useState<string>(nickName ?? '');
    const accessToken = localStorage.getItem('accessToken');
    if (userInfo == null) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
        return;
    }
    const userInfoData: UserInfoData = JSON.parse(userInfo);
    let gen: string = '남자';
    if (gender == 'F') gen = '여자';
    async function usersInfo() {
        try {
            const res = await instance.get('/users', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (res.status === 200) {
                console.log('res', res);
                setMyInfo(res.data.data);
            }
        } catch (e: any) {
            if (e.response.status === 401) {
                if (await UseGetNewAccessToken(accessToken!)) {
                    usersInfo();
                }
            }
            //console.log(e);
        }
    }
    const sendModifiedNickName = async () => {
        try {
            const res = await instance.put(
                `/users/nickname`,
                {
                    nickName: nickNameState,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                },
            );
            console.log(res);
            if (res.status === 200) {
                usersInfo();
                alert('닉네임이 수정되었습니다.');
            }
        } catch (e: any) {
            alert('닉네임 수정에 실패했습니다.');
            if (e.response.status === 401) {
                if (await UseGetNewAccessToken(accessToken!)) {
                    sendModifiedNickName();
                }
            }
            return;
        }
    };

    const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickNameState(e.target.value);
    };
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
                    <img
                        style={{ width: '84px', height: '84px', borderRadius: '50%' }}
                        src={userInfoData.profileImage}
                        alt="profile"
                    />
                </S.Icon>
                <S.Tags>
                    <S.Tag>{gen}</S.Tag>
                    <S.Tag>{age}</S.Tag>
                </S.Tags>
            </S.UserInfo>
            <S.StyledInputWrapper>
                <S.StyledInput onChange={onChangeNickName} defaultValue={nickName ?? name} />
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
            <S.ButtonWrapper onClick={sendModifiedNickName}>저장하기</S.ButtonWrapper>
        </S.BodyWrapper>
    );
}

export default Body;
