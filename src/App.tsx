import { OAUTH_PROVIDER } from '@pages/LoginPage/consts';
import handleOAuth2Redirect from './pages/LoginPage/OAuth';
import { useNavigate } from 'react-router';
function App() {
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
export default App;
