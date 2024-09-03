import instance from '@apis';
import type { NavigateFunction } from 'react-router';
import { OAUTH_PROVIDER, SIGNTYPE, type TSIGNTYPE, type TOauthProvider } from './consts';
import { match } from 'ts-pattern';
import { getAccessToken } from '@utils/getAccessToken';

async function fetchLoginUserInfo() {
    const accessToken = getAccessToken();
    alert('alertAccessToken: ' + accessToken);
    try {
        const res = await instance.get('/users', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (res.status === 200) {
            localStorage.setItem('myInfo', JSON.stringify(res.data.data));
        }
    } catch (e: any) {
        alert('사용자 정보를 불러오는데 실패했습니다.');
    }
}

async function requestToken(code: string, from: TOauthProvider) {
    try {
        const { data } = await instance.post(`/oauth/${from}`, {
            authorizationCode: code,
        });

        if (data.data?.accessToken) {
            localStorage.setItem('accessToken', data.data.accessToken);
            document.cookie = `refreshToken=${data.data.refreshToken}; path=/;`;
            await fetchLoginUserInfo();
            return data.data.signType;
        } else {
            throw new Error('Failed to fetch user info.');
        }
    } catch (e) {
        alert('로그인에 실패했습니다. 관리자에게 문의주세요.');
    }
}

interface OAuth2RedirectHandlerProps {
    from: TOauthProvider;
    navigate: NavigateFunction;
}

export async function handleOAuth2Redirect({ from, navigate }: OAuth2RedirectHandlerProps) {
    const url = new URL(window.location.href);
    let code = url.searchParams.get('code')?.toString();

    if (!code) return;

    if (from === OAUTH_PROVIDER.GOOGLE) {
        code = code.substring(3);
    }

    const signType = await requestToken(code, from);

    match(signType as TSIGNTYPE)
        .with(SIGNTYPE.SIGNIN, () => navigate('/mainpage'))
        .with(SIGNTYPE.SIGNUP, () => navigate('/selectgenderage'))
        .exhaustive();
}

export default handleOAuth2Redirect;
