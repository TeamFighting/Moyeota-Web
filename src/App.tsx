import OAuth2RedirectHandler from './Pages/LoginPage/OAuth';
function App() {
    OAuth2RedirectHandler({ data: window.location.href, from: 'Kakao' });
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code=');

    return <div>로그인 중..</div>;
}

export default App;
