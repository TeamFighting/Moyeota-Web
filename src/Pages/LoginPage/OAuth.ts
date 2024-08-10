import instance from '@apis/index';
import type { NavigateFunction } from 'react-router';
import { OAUTH_PROVIDER, type TOauthProvider } from './consts';

async function requestToken(code: string, from: TOauthProvider) {
    try {
        const { data } = await instance.post(`/oauth/${from}`, {
            authorizationCode: code,
        });

        if (data.data?.accessToken) {
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('refreshToken', data.data.refreshToken);
        } else {
            throw new Error('토큰이 없습니다.');
        }
    } catch {
        alert('로그인에 실패했습니다.');
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
    console.log('AuthToken', AuthToken);
    await requestToken(AuthToken, from);
    navigate('/mainpage');
}

export default handleOAuth2Redirect;
