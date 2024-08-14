import { useNavigate, useParams } from 'react-router';
import { Chevronleft } from '@assets/svg';
import { ChatHeader } from '@pages/FirebaseChat/views/ChatLists';
import { match } from 'ts-pattern';
import type { TAddAccountFrom } from './constants';
import { useAccountStore } from '@stores/AccountStore';

function Header() {
    const navigate = useNavigate();
    const { from, userId } = useParams();
    const { clearAccount } = useAccountStore();
    const handleGoback = () => {
        clearAccount();
        match(from as TAddAccountFrom)
            .with('createPot', () => navigate('/createPotPage'))
            .with('mypage', () => navigate(`/mypage/${userId}`)).exhaustive;
    };
    return (
        <ChatHeader style={{ height: '64px', width: '100%', paddingLeft: '10px', boxSizing: 'border-box' }}>
            <Chevronleft onClick={handleGoback} width={24} height={24} />
        </ChatHeader>
    );
}

export default Header;
