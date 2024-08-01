import styled from 'styled-components';
import Body from './Body';
import Header from './Header';
import { useEffect } from 'react';
import watchPositionHook from '../../Hooks/useWatchPositionHook';
import useIsMobile from '../../Hooks/useIsMobile';

function LoginPage() {
    watchPositionHook();
    const isMobile = useIsMobile();
    useEffect(() => {
        const haveToken = sessionStorage.getItem('accessToken');
        if (haveToken !== null) {
            window.location.href = '/mainpage';
        }
        alert(isMobile);
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
