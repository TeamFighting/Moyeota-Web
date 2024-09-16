import { OAUTH_PROVIDER } from '@pages/LoginPage/consts';
import { useNavigate } from 'react-router';

import handleOAuth2Redirect from './OAuth';
function LoginLoading() {
    const navigate = useNavigate();
    const url = new URL(window.location.href);
    const isNaver = url.searchParams.get('state')?.toString();
    const isGoogle = url.toString().search('google');
    if (isNaver === 'nid/me') {
        handleOAuth2Redirect({ from: OAUTH_PROVIDER.NAVER, navigate });
    } else if (isGoogle !== -1) {
        handleOAuth2Redirect({ from: OAUTH_PROVIDER.GOOGLE, navigate });
    } else {
        handleOAuth2Redirect({ from: OAUTH_PROVIDER.KAKAO, navigate });
    }
    return <div>로그인 중..</div>;
}
export default LoginLoading;
