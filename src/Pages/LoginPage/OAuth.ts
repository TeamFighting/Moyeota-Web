import axios from 'axios';
import { useNavigate } from 'react-router';

interface OAuth2RedirectHandlerProps {
    from: string;
}

export async function RequestToken(code: string, from: string) {
    const navigate = useNavigate();
    if (from === 'KAKAO') {
        axios
            .post('https://moyeota.shop/api/oauth/kakao', {
                authorizationCode: code,
            })
            .then((response) => {
                if (response.data && response.data.data.accessToken) {
                    const token = response.data.data.accessToken;
                    localStorage.setItem('accessToken', token);
                    console.log('get token', token);
                    navigate('/mainpage');
                } else {
                    console.log('유효하지 않은 토큰');
                }
            })
            .catch(function () {
                alert('로그인에 실패했습니다.');
            });
    } else if (from === 'GOOGLE') {
        axios
            .post('https://moyeota.shop/api/oauth/google', {
                authorizationCode: code,
            })
            .then((response) => {
                console.log('토큰이다 이것들아', response.data.data.accessToken);

                if (response.data && response.data.data.accessToken) {
                    const token = response.data.data.accessToken;
                    localStorage.setItem('accessToken', token);
                    navigate('/mainpage');
                } else {
                    console.log('유효하지 않은 토큰');
                }
            })
            .catch(function () {
                alert('로그인에 실패했습니다.');
            });
    } else if (from === 'NAVER') {
        axios
            .post('https://moyeota.shop/api/oauth/naver', {
                authorizationCode: code,
            })
            .then((response) => {
                console.log('토큰이다 이것들아', response.data.data.accessToken);
                if (response.data && response.data.data.accessToken) {
                    const token = response.data.data.accessToken;
                    localStorage.setItem('accessToken', token);
                    navigate('/mainpage');
                } else {
                    alert('로그인에 실패했습니다.');
                }
            })
            .catch(function () {
                alert('로그인에 실패했습니다.');
            });
    }
}
export function OAuth2RedirectHandler({ from }: OAuth2RedirectHandlerProps) {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code')?.toString();
    let AuthToken = code;
    if (!code || !AuthToken) return;
    if (from == 'GOOGLE') {
        AuthToken = code.substring(3, code.length);
    }
    console.log('AuthToken', AuthToken);
    RequestToken(AuthToken, from);
}

export default OAuth2RedirectHandler;
