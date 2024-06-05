import OAuth2RedirectHandler from './Pages/LoginPage/OAuth';
function App() {
    const url = new URL(window.location.href);
    const isNaver = url.searchParams.get('state')?.toString();
    const isGoogle = url.searchParams.get('scope')?.toString();

    if (isNaver === 'nid/me') {
        OAuth2RedirectHandler({ from: 'NAVER' });
    } else if (isGoogle === 'email profile openid') {
        OAuth2RedirectHandler({ from: 'Google' });
    } else {
        OAuth2RedirectHandler({ from: 'Kakao' });
    }
    return <div>로그인 중..</div>;
}

export default App;
