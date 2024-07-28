import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { HEADER_HEIGHT } from '../../../Constants/constant';
import SvgCancelIcon from '../../../assets/svg/CancelIcon';
import CheveronLeft from '../../../assets/svg/Chevronleft';
interface HeaderProps {
    title: string;
}
function Header({ title }: HeaderProps) {
    const { userId } = useParams();
    const navigate = useNavigate();
    const goBack = () => {
        navigate(`/mypage/${userId}`);
    };
    return (
        <HeaderWrapper>
            <DIV>
                <Icon style={{ alignSelf: 'center' }} onClick={goBack}>
                    <CheveronLeft width="24" height="24" />
                </Icon>
                <Title>{title}</Title>
                <Icon style={{ alignSelf: 'center' }} onClick={goBack}>
                    <SvgCancelIcon width="24" height="24" />
                </Icon>
            </DIV>
        </HeaderWrapper>
    );
}
const DIV = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: ${HEADER_HEIGHT}px;
    width: 100vw;
    height: 84px;
    justify-content: center;
`;
const Icon = styled.div`
    cursor: pointer;
    align-items: center;
    display: flex;
    justify-content: center;
    width: 24px;
    height: 24px;
`;
const Title = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
export default Header;
