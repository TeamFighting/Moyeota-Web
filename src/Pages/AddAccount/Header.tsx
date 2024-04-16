import { Chevronleft } from '../../assets/svg';
import { ChatHeader } from '../FirebaseChat/ChatLists';

function Header() {
    const handleGoback = () => {
        window.history.back();
    };
    return (
        <ChatHeader style={{ zIndex: 1, width: '100%' }}>
            <Chevronleft onClick={handleGoback} width={24} height={24} />
        </ChatHeader>
    );
}

export default Header;
