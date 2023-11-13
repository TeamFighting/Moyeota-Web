import styled from 'styled-components'
import { HEADER_HEIGHT } from '../../../Constants/constant'
import { useNavigate } from 'react-router-dom'
import SvgCancelIcon from '../../../assets/svg/CancelIcon'
import CheveronLeft from '../../../assets/svg/Chevronleft'

function UpdateHeader() {
    const navigate = useNavigate()
    const goBack = () => {
        navigate('/mainpage') //마이 페이지로 가도록 수정
    }
    return (
        <Header>
            <Icon style={{ alignSelf: 'center' }} onClick={goBack}>
                <CheveronLeft width="24" height="24" />
            </Icon>
            <HeaderText>계정 관리</HeaderText>
            <Icon style={{ alignSelf: 'center' }} onClick={goBack}>
                <SvgCancelIcon width="24" height="24" />
            </Icon>
        </Header>
    )
}

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
    height: ${HEADER_HEIGHT}px;
    justify-content: space-between;
    padding: 0 4%;
`
const Icon = styled.div`
    cursor: pointer;
    align-self: flex-start;
`

const HeaderText = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-bottom: 21px;
`

export default UpdateHeader
