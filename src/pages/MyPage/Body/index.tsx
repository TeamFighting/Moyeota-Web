import BottomNav from '@components/BottomNav';
import Lists from './Lists';
import BodyTop from './Top';

function Body() {
    const userInfo = JSON.parse(localStorage.getItem('myInfo') || '{}');

    return (
        <div>
            <BodyTop />
            <Lists userId={userInfo.id} />
            <BottomNav />
        </div>
    );
}

export default Body;
