import BottomBtn from '../../../components/BottomBtn';
import Lists from './Lists';
import BodyTop from './Top';

function Body() {
    const userInfo = JSON.parse(localStorage.getItem('myInfo') || '{}');

    return (
        <div>
            <BodyTop />
            <Lists userId={userInfo.id} />
            <BottomBtn />
        </div>
    );
}

export default Body;
