import { useNavigate, useParams } from 'react-router';
import { Chevronleft } from '@assets/svg';
import { ChatHeader } from '@pages/FirebaseChat/views/ChatLists';
import { match } from 'ts-pattern';
import type { TAddAccountFrom } from './constants';

function Header() {
    const navigate = useNavigate();
    const { from, userId } = useParams();
    const handleGoback = () => {
        match(from as TAddAccountFrom)
            .with('createPot', () => navigate('/createPotPage'))
            .with('mypage', () => navigate(`/mypage/${userId}`)).exhaustive;
    };
    return (
        <ChatHeader style={{ width: '90%' }}>
            <Chevronleft onClick={handleGoback} width={24} height={24} />
        </ChatHeader>
    );
}

export default Header;
