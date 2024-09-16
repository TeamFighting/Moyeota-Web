import BottomNav from '@components/BottomNav';

import Lists from './Lists';
import BodyTop from './Top';
import { BODYHEIGHT } from '../const';

function Body() {
    const userInfo = JSON.parse(localStorage.getItem('myInfo') || '{}');

    return (
        <div style={{ height: BODYHEIGHT, overflow: 'scroll' }}>
            <BodyTop />
            <Lists userId={userInfo.id} />
            <BottomNav />
        </div>
    );
}

export default Body;
