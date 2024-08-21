import instance from '@apis';
import type { NavigateFunction } from 'react-router';
import { OAUTH_PROVIDER, SIGNTYPE, type TSIGNTYPE, type TOauthProvider } from './consts';
import { match } from 'ts-pattern';

async function requestToken(code: string, from: TOauthProvider) {
    try {
        const { data } = await instance.post(`/oauth/${from}`, {
            authorizationCode: code,
        });
        console.log(data);
        if (data.data?.accessToken) {
            localStorage.setItem('accessToken', data.data.accessToken);
            return data.data.signType;
        } else {
            throw new Error('토큰이 없습니다.');
        }
    } catch {
        alert('로그인에 실패했습니다. 관리자에게 문의주세요.');
    }
}

interface OAuth2RedirectHandlerProps {
    from: TOauthProvider;
    navigate: NavigateFunction;
}

export async function handleOAuth2Redirect({ from, navigate }: OAuth2RedirectHandlerProps) {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code')?.toString();
    let AuthToken = code;
    if (!code || !AuthToken) return;
    if (from == OAUTH_PROVIDER.GOOGLE) {
        AuthToken = code.substring(3, code.length);
    }
    const signType = await requestToken(AuthToken, from);
    match(signType as TSIGNTYPE)
        .with(SIGNTYPE.SIGNIN, () => navigate('/mainpage'))
        .with(SIGNTYPE.SIGNUP, () => navigate('/selectgenderage')).exhaustive;
}

export default handleOAuth2Redirect;
