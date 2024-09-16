import { Chevronleft } from '@assets/svg';
import styled from 'styled-components';

function Header() {
    return (
        <Wrapper>
            <Chevronleft width={24} height={24} />
        </Wrapper>
    );
}
const Wrapper = styled.div`
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 14px;
    background-color: white;
    z-index: 1;
`;
export default Header;
