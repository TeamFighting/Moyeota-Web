import { useEffect } from 'react';
import styled from 'styled-components';
import Body from './Body';
import Header from './Header';
import watchPositionHook from '@hooks/useWatchPositionHook';

function LoginPage() {
    watchPositionHook();
    useEffect(() => {
        const haveToken = localStorage.getItem('accessToken');
        if (haveToken !== null) {
            window.location.href = '/mainpage';
        }
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
    height: 100dvh;
`;
export default LoginPage;
