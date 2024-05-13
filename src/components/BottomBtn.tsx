import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Chat, Home, User, ClickedChat, ClickedHome, ClickedUser } from '../assets/svg';
import { ClickedBottomTab } from '../state/store/ClickedBottomTab';
import toast, { Toaster } from 'react-hot-toast';

function BottomBtn() {
    const { clicked, setClicked } = ClickedBottomTab();
    const naviagte = useNavigate();
    const handleHomeClick = () => {
        naviagte('/mainpage');
        setClicked('home');
    };
    const handleChatClick = () => {
        naviagte('/chatlists');
        setClicked('chat');
    };
    const handleMyPageClick = () => {
        toast.error('내정보는 모바일을 이용해주세요 😊', { duration: 800 });
    };
    return (
        <Wrapper>
            <Toaster position="bottom-center" reverseOrder={false} />
            <Section onClick={handleHomeClick}>
                <Icon>{clicked == 'home' ? <ClickedHome /> : <Home />}</Icon>
                <Text>홈</Text>
            </Section>
            <Section onClick={handleChatClick}>
                <Icon>{clicked == 'chat' ? <ClickedChat /> : <Chat />}</Icon>
                <Text>채팅</Text>
            </Section>
            <Section onClick={handleMyPageClick}>
                <Icon>{clicked === 'mypage' ? <ClickedUser width={26} height={26} /> : <User />}</Icon>
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
    height: 100%;
    flex: 1;
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
    position: relative;
    bottom: 0;
    z-index: 10000000000000;
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
`;
export default BottomBtn;
