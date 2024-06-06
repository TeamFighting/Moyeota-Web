import Lists from './Lists';
import BodyTop from './Top';

function Body() {
    const userInfo = JSON.parse(localStorage.getItem('myInfo') || '{}');
    let gender = '남자';
    if (userInfo.gender == 'F') gender = '여자';
    let age = userInfo.age[0];
    if (age == '1') age = '10대';
    else if (age == '2') age = '20대';
    else if (age == '3') age = '30대';
    else if (age == '4') age = '40대';
    else if (age == '5') age = '50대';
    else age = '60대 이상';
    return (
        <div>
            <BodyTop />
            <Lists userId={userInfo.id} />
        </div>
    );
}

export default Body;
