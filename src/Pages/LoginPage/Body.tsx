import { GoogleLogin, KakaoLogin, NaverLogin } from '../../assets/svg';
import * as S from './style';

function Body() {
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
                    <S.Icon>
                        <KakaoLogin />
                    </S.Icon>
                    <S.Icon>
                        <GoogleLogin />
                    </S.Icon>
                    <S.Icon>
                        <NaverLogin />
                    </S.Icon>
                </S.LoginButtons>
                <S.LoginExplanation>SNS계정으로 시작하기</S.LoginExplanation>
            </S.LoginSection>
        </S.Wrapper>
    );
}

export default Body;
