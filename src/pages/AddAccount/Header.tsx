import { useNavigate } from 'react-router';
import { Chevronleft } from '@assets/svg';
import { ChatHeader } from '@pages/FirebaseChat/views/ChatLists';

function Header() {
    const navigate = useNavigate();
    const handleGoback = () => {
        navigate('/mainpage');
    };
    return (
        <ChatHeader style={{ width: '90%' }}>
            <Chevronleft onClick={handleGoback} width={24} height={24} />
        </ChatHeader>
    );
}

export default Header;
