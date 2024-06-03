import OAuth2RedirectHandler from './Pages/LoginPage/OAuth';
function App() {
    OAuth2RedirectHandler({ data: window.location.href, from: 'Kakao' });
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code=');
    if (!code) return <div>로그인 실패</div>;
    return <div>로그인sdfsdf 성공</div>;
}

export default App;
