import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
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
            <Icon style={{ alignSelf: 'center' }} onClick={goBack}>
                <CheveronLeft width="24" height="24" />
            </Icon>
            <Title>{title}</Title>
            <Icon style={{ alignSelf: 'center' }} onClick={goBack}>
                <SvgCancelIcon width="24" height="24" />
            </Icon>
        </HeaderWrapper>
    );
}
const HeaderWrapper = styled.div`
    width: 100%;
    height: 84px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 0 14px;
    box-sizing: border-box;
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
