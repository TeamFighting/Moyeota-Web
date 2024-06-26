import { CancelIcon, Chevronleft } from '../../../assets/svg';
import { ChatHeader } from '../../FirebaseChat/ChatLists';

function Header() {
    const handleGoback = () => {
        window.history.back();
    };
    return (
        <ChatHeader>
            <Chevronleft onClick={handleGoback} width={24} height={24} />
            정산 현황
            <CancelIcon width={24} height={24} />
        </ChatHeader>
    );
}

export default Header;
