import styled from 'styled-components';
import Body from './Body';
import Header from './Header';

function LoginPage() {
    return (
        <Container>
            <Header />
            <Body></Body>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`;
export default LoginPage;
