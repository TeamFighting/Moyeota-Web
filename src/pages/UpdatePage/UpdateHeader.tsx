import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import SvgCancelIcon from '../../assets/svg/CancelIcon';
import CheveronLeft from '../../assets/svg/Chevronleft';

function UpdateHeader() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const goBack = () => {
        navigate(`/detailpage/${postId}`);
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
    height: 64px;
    justify-content: space-between;
    padding: 4% 4%;
    align-items: center;
`;
const Icon = styled.div`
    cursor: pointer;
    align-self: flex-start;
`;

export default UpdateHeader;
