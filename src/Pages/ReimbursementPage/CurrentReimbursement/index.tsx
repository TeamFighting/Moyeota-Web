import Header from './Header';
import Body from './Body';
import { useLocation } from 'react-router';

function CurrentReimbursement() {
    const location = useLocation();
    const { data } = location.state;
    console.log(data);
    return (
        <div style={{ width: '100vw', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Body data={data} />
        </div>
    );
}

export default CurrentReimbursement;
