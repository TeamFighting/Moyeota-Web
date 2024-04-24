import Header from './Header';
import Body from './Body';
import styled from 'styled-components';
import ReimburseMap from './ReimburseMap';
import useCurrentLocation from '../../../Hooks/CurrentLocation';
import watchPositionHook from '../../../Hooks/watchPositionHook';

function ApplierReimbusement() {
    useCurrentLocation();
    watchPositionHook();
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Header />
            <Body />
            <Bottom>
                <ReimburseMap />
            </Bottom>
        </div>
    );
}

const Bottom = styled.div`
    width: 100%;
    height: 50%;
    background: 'red';
`;

export default ApplierReimbusement;
