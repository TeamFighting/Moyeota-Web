import styled from 'styled-components';
import { HEADER_HEIGHT } from '@constants';
import { useNavigate } from 'react-router-dom';
import CheveronLeft from '@assets/svg/Chevronleft';

function Header() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/login');
    };
    return (
        <Wrapper>
            <Icon style={{ alignSelf: 'center' }} onClick={goBack}>
                <CheveronLeft width="24" height="24" />
            </Icon>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
    height: ${HEADER_HEIGHT}px;
    justify-content: space-between;
    padding: 0 14px;
    position: sticky;
    top: 0;
    background-color: white;
    width: 100%;
`;
const Icon = styled.div`
    cursor: pointer;
    align-self: flex-start;
`;

export default Header;
