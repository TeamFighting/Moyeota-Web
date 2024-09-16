import SvgCancelIcon from '@assets/svg/CancelIcon';
import CheveronLeft from '@assets/svg/Chevronleft';
import { HEADER_HEIGHT } from '@constants';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface DetailHeaderProps {
    from: string;
}
function DetailHeader(routeState: DetailHeaderProps) {
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('myInfo') as string).id;
    const goBack = () => {
        if (routeState.from === 'BottomSheet') {
            navigate('/mainpage');
        } else if (routeState.from === 'MyPot') {
            navigate(`/mypot/${userId}`);
        }
    };
    return (
        <Header>
            <Icon style={{ alignSelf: 'center' }} onClick={goBack}>
                <CheveronLeft width="24" height="24" />
            </Icon>
            <Icon style={{ alignSelf: 'center' }} onClick={goBack}>
                <SvgCancelIcon width="24" height="24" />
            </Icon>
        </Header>
    );
}

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
    height: ${HEADER_HEIGHT}px;
    justify-content: space-between;
    position: fixed;
    top: 0;
    align-self: center;
    width: 92.5%;
    padding: 0 3.75%;
    background-color: white;
    z-index: 100;
`;
const Icon = styled.div`
    cursor: pointer;
    align-self: flex-start;
`;

export default DetailHeader;
