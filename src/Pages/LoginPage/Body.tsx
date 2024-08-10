import { useNavigate } from 'react-router';
import { GoogleLogin, KakaoLogin, NaverLogin } from '../../assets/svg';
import handleOAuth2Redirect from './OAuth';
import { match } from 'ts-pattern';
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
                    {Object.values(OAUTH_PROVIDER).map((provider) => (
                        <S.Icon key={provider} onClick={() => navToLogin(provider)}>
                            {match(provider)
                                .with(OAUTH_PROVIDER.KAKAO, () => <KakaoLogin />)
                                .with(OAUTH_PROVIDER.GOOGLE, () => <GoogleLogin />)
                                .with(OAUTH_PROVIDER.NAVER, () => <NaverLogin />)
                                .exhaustive()}
                        </S.Icon>
                    ))}
                </S.LoginButtons>
                <S.LoginExplanation>SNS계정으로 시작하기</S.LoginExplanation>
            </S.LoginSection>
        </S.Wrapper>
    );
}

export default Body;
