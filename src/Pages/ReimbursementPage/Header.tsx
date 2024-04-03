import { ChatHeader } from '../FirebaseChat/ChatLists';
import { CancelIcon, Chevronleft } from '../../assets/svg';

function Header() {
    return (
        <ChatHeader>
            <Chevronleft width={24} height={24} />
            정산하기
            <CancelIcon width={24} height={24} />
        </ChatHeader>
    );
}

export default Header;
