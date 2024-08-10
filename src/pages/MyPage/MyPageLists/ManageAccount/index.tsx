import Header from '../Header';
import Body from './Body';

function ManageProfile() {
    return (
        <div>
            <Header title={'계정 관리'} />
            <div style={{ borderBottom: '9px solid #f5f6f8' }} />
            <Body />
        </div>
    );
}

export default ManageProfile;
