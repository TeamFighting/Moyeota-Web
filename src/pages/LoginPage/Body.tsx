import { useNavigate } from 'react-router';
import { KakaologinWide } from '@assets/svg';
import handleOAuth2Redirect from './OAuth';
import { OAUTH_PROVIDER, OAUTH_REQUEST_URLS, type TOauthProvider } from './consts';
import * as S from './style';

function Body() {
    const navigate = useNavigate();

    const navToLogin = (from: TOauthProvider) => {
        window.location.href = OAUTH_REQUEST_URLS[from];
        handleOAuth2Redirect({ from, navigate });
    };

    return (
        <S.Wrapper>
            <div>
                <S.Title>
                    반가워요 ! <br /> 회원 가입을 해주세요
                </S.Title>
                <S.Explanation>휴대폰 번호는 안전하게 보관됩니다.</S.Explanation>
            </div>
            <S.LoginSection>
                <S.LoginButtons>
                    <S.Icon onClick={() => navToLogin(OAUTH_PROVIDER.KAKAO)}>
                        <KakaologinWide />
                    </S.Icon>
                </S.LoginButtons>
                <S.LoginExplanation>SNS계정으로 시작하기</S.LoginExplanation>
            </S.LoginSection>
        </S.Wrapper>
    );
}

export default Body;
