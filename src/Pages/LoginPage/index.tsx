import styled from 'styled-components';
import Body from './Body';
import Header from './Header';
import { useEffect } from 'react';
import watchPositionHook from '../../Hooks/useWatchPositionHook';

function LoginPage() {
    watchPositionHook();
    useEffect(() => {
        const haveToken = sessionStorage.getItem('accessToken');
        if (haveToken !== null) {
            window.location.href = '/mainpage';
        }
        alert(navigator.userAgent);
    }, []);

    return (
        <Container>
            <Header />
            <Body />
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`;
export default LoginPage;
