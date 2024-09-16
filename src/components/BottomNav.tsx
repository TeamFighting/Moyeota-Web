import { Chat, Home, ClickedChat, ClickedHome, ClickedUser, User } from '@assets/svg';
import { ClickedBottomTab } from '@stores/ClickedBottomTab';
import { useClickedMarker } from '@stores/ClickedMarker';
import { useQuickPotStore } from '@stores/QuickPotStore';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

function BottomNav() {
    const { clicked, setClicked } = ClickedBottomTab();
    const naviagte = useNavigate();
    const { clearClickedMarker } = useClickedMarker();
    const { clearQuickPot } = useQuickPotStore();
    const userId = JSON.parse(localStorage.getItem('myInfo') as string).id;
    const handleHomeClick = () => {
        clearQuickPot();
        naviagte('/mainpage');
        setClicked('home');
        clearClickedMarker();
    };
    const handleChatClick = () => {
        naviagte('/chatlists');
        setClicked('chat');
    };
    const handleMyPageClick = () => {
        naviagte(`/MyPage/${userId}`);
        setClicked('mypage');
    };
    return (
        <Wrapper>
            <Section onClick={handleHomeClick}>
                <Icon>
                    {clicked == 'home' ? <ClickedHome width={26} height={26} /> : <Home width={26} height={26} />}
                </Icon>
                <Text>홈</Text>
            </Section>
            <Section onClick={handleChatClick}>
                <Icon>
                    {clicked == 'chat' ? <ClickedChat width={26} height={26} /> : <Chat width={26} height={26} />}
                </Icon>
                <Text>채팅</Text>
            </Section>
            <Section onClick={handleMyPageClick}>
                <Icon>
                    {clicked === 'mypage' ? <ClickedUser width={26} height={26} /> : <User width={26} height={26} />}
                </Icon>
                <Text>내정보</Text>
            </Section>
        </Wrapper>
    );
}

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    flex: 1;
    height: 100%;
`;
const Text = styled.div`
    color: var(--Icon, #606060);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 12px */
`;
const Wrapper = styled.div`
    width: 100vw;
    height: 74px;
    position: absolute;
    bottom: 0;
    z-index: 3;
    background-color: white;
    display: flex;
    justify-content: space-around;
    display: inline-flex;
    align-items: flex-start;
    gap: 10px;
    border-radius: 12px 12px 0px 0px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;
const Icon = styled.div`
    width: 26px;
    height: 26px;
    margin: 0 auto;
    margin-top: 12px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
`;
export default BottomNav;
