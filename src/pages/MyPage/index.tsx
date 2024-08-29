import Header from './MyInfoHeader';
import Body from './Body/index';
import { WINDOW_HEIGHT } from '@constants/index';

function MyPage() {
    console.log(WINDOW_HEIGHT);
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <Header />
            <Body />
        </div>
    );
}
export default MyPage;
