import Lists from './Lists';
import BodyTop from './Top';

function Body() {
    const userInfo = JSON.parse(localStorage.getItem('myInfo') || '{}');

    return (
        <div>
            <BodyTop />
            <Lists userId={userInfo.id} />
        </div>
    );
}

export default Body;
