import OAuth2RedirectHandler from './Pages/LoginPage/OAuth';
function App() {
    const url = new URL(window.location.href);
    const isNaver = url.searchParams.get('state')?.toString();
    const isGoogle = url.toString().search('google');
    if (isNaver === 'nid/me') {
        OAuth2RedirectHandler({ from: 'NAVER' });
    } else if (isGoogle !== -1) {
        OAuth2RedirectHandler({ from: 'GOOGLE' });
    } else {
        OAuth2RedirectHandler({ from: 'KAKAO' });
    }
    return <div>로그인 중..</div>;
}
export default App;
