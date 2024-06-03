import axios from 'axios';

interface OAuth2RedirectHandlerProps {
    data: string;
    from: string;
}

export async function RequestToken(code: string, from: string) {
    if (from === 'Kakao') {
        console.log('카카오로 로그인');
        axios
            .post('https://moyeota.shop/api/oauth/kakao', {
                authorizationCode: code,
            })
            .then((response) => {
                if (response.data && response.data.data.accessToken) {
                    const token = response.data.data.accessToken;
                    localStorage.setItem('accessToken', token);
                    console.log('get token', token);
                } else {
                    console.log('유효하지 않은 토큰');
                }
            })
            .catch(function (e) {
                console.log(e);
            });
    } else if (from === 'Google') {
        axios
            .post('https://moyeota.shop/api/oauth/google', {
                authorizationCode: code,
            })
            .then((response) => {
                console.log('토큰이다 이것들아', response.data.data.accessToken);

                if (response.data && response.data.data.accessToken) {
                    const token = response.data.data.accessToken;
                    localStorage.setItem('accessToken', token);
                } else {
                    console.log('유효하지 않은 토큰');
                }
            })
            .catch(function (e) {
                console.log(e);
            });
    } else if (from === 'Naver') {
        axios
            .post('https://moyeota.shop/api/oauth/naver', {
                authorizationCode: code,
            })
            .then((response) => {
                console.log('토큰이다 이것들아', response.data.data.accessToken);
                if (response.data && response.data.data.accessToken) {
                    const token = response.data.data.accessToken;
                    localStorage.setItem('accessToken', token);
                } else {
                    console.log('유효하지 않은 토큰');
                }
            })
            .catch(function (e) {
                console.log(e);
            });
    }
}
export function OAuth2RedirectHandler({ data, from }: OAuth2RedirectHandlerProps) {
    console.log('data', data);
    console.log('from', from);
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code')?.toString();
    if (!code) return;
    RequestToken(code, from);
    // const condition = data.indexOf(exp);
    // if (condition !== -1) {
    //     const requestCode = data.substring(condition + exp.length).split('&')[0];
    //     RequestToken(requestCode, from);
    // }
}

export default OAuth2RedirectHandler;
