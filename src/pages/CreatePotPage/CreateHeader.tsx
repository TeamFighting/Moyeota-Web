import SvgCancelIcon from '@assets/svg/CancelIcon';
import CheveronLeft from '@assets/svg/Chevronleft';
import { HEADER_HEIGHT } from '@constants';
import DestinationStore from '@stores/DestinationResult';
import DurationFareStore from '@stores/DurationFareStore';
import PotCreateStore from '@stores/PotCreateStore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function CreateHeader() {
    const navigate = useNavigate();
    const { clearPotCreateStore } = PotCreateStore();
    const { clearDestinationStore } = DestinationStore();
    const { clearDurationFareStore } = DurationFareStore();
    const goBack = () => {
        clearPotCreateStore();
        clearDestinationStore();
        clearDurationFareStore();
        navigate('/mainpage');
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
    padding: 14px 14px;
`;
const Icon = styled.div`
    cursor: pointer;
    align-self: flex-start;
`;

export default CreateHeader;
