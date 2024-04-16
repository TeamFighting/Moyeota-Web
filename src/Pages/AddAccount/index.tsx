import Body from './Body';
import Header from './Header';

function AddAccount() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100vw',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Header />
            <Body />
        </div>
    );
}

export default AddAccount;
