import { instance } from '../../axios';
import { useNavigate } from 'react-router';

interface OAuth2RedirectHandlerProps {
    from: string;
}

export async function RequestToken(code: string, from: string) {
    const navigate = useNavigate();
    if (from === 'KAKAO') {
        console.log('카카오로그인요청');
        console.log('code', code);
        instance
            .post('/oauth/kakao', {
                authorizationCode: code,
            })
            .then((response) => {
                console.log('kakao login res', response);
                if (response.data && response.data.data.accessToken) {
                    document.cookie = `refreshToken=${response.data.data.refreshToken}; expires=${new Date(
                        Date.now() + 1000 * 60 * 60 * 24 * 21,
                    ).toUTCString()}`;

                    localStorage.setItem('accessToken', response.data.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.data.refreshToken);
                    navigate('/mainpage');
                } else {
                    console.log('유효하지 않은 토큰');
                }
            })
            .catch(function () {
                alert('로그인에 실패했습니다.');
            });

        // 추후 리팩토링 예정
        // } else if (from === 'GOOGLE') {
        //   instance
        //     .post('/oauth/google', {
        //       authorizationCode: code,
        //     })
        //     .then((response) => {
        //       // console.log('토큰이다 이것들아', response.data.data);

        //       if (response.data && response.data.data.accessToken) {
        //         const token = response.data.data.accessToken;
        //         localStorage.setItem('accessToken', token);
        //         navigate('/mainpage');
        //       } else {
        //         console.log('유효하지 않은 토큰');
        //       }
        //     })
        //     .catch(function () {
        //       alert('로그인에 실패했습니다.');
        //     });
        // } else if (from === 'NAVER') {
        //   instance
        //     .post('oauth/naver', {
        //       authorizationCode: code,
        //     })
        //     .then((response) => {
        //       // console.log('토큰이다 이것들아', response.data.data);
        //       if (response.data && response.data.data.accessToken) {
        //         const token = response.data.data.accessToken;
        //         localStorage.setItem('accessToken', token);
        //         navigate('/mainpage');
        //       } else {
        //         alert('로그인에 실패했습니다.');
        //       }
        //     })
        //     .catch(function () {
        //       alert('로그인에 실패했습니다.');
        //     });
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
