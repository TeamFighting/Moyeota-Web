import { ChatHeader } from '@pages/FirebaseChat/views/ChatLists';
import { CancelIcon, Chevronleft } from '@assets/svg';

function Header() {
    const handleGoback = () => {
        window.history.back();
    };
    return (
        <ChatHeader>
            <Chevronleft onClick={handleGoback} width={24} height={24} />
            송금하기
            <CancelIcon width={24} height={24} />
        </ChatHeader>
    );
}

export default Header;
