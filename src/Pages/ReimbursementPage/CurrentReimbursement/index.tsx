import Header from './Header';
import Body from './Body';
import { useLocation } from 'react-router';
import { CurrentReimburseStore } from '../../../state/store/CurrentReimburseStore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
interface EachAmount {
    userId: number;
    amount: number;
    name: string;
    profileImage: string;
    isPartyOwner: boolean;
}
function CurrentReimbursement() {
    const location = useLocation();
    const { data } = location.state;
    const { CurrentReimbursement, setCurrentReimbursement } = CurrentReimburseStore();
    const [modalOpen, setModalOpen] = useState(true);
    const [modalName, setModalName] = useState('default');
    // console.log('CurrentReimbursement', CurrentReimbursement.length);
    useEffect(() => {
        if (CurrentReimbursement.length == 0) {
            const transformedData = data.EachAmount.map((element: EachAmount) => ({
                isPayed: { userId: element.userId },
                postId: data.postId,
            }));
            setCurrentReimbursement(transformedData);
        }
    }, []);

    const confirm = () => {
        setModalOpen(false);
    };
    return (
        <div style={{ width: '100vw', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Body setModalOpen={setModalOpen} data={data} />
            {modalOpen && (
                <ModalWrapper>
                    <Modal>
                        <Text>
                            <Title>
                                정산이 완료되었습니다! <br />
                                정산 완료로 바꾸시겠습니까?
                            </Title>
                        </Text>
                        <Buttons>
                            <StyledBtn style={{ backgroundColor: '#F5F6F8', color: '#5D5D5D' }}>대기</StyledBtn>
                            <StyledBtn onClick={confirm} style={{ backgroundColor: '#1EDD81' }}>
                                확인
                            </StyledBtn>
                        </Buttons>
                    </Modal>
                </ModalWrapper>
            )}
        </div>
    );
}
const ModalWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    align-items: center;
    background: rgba(65, 65, 65, 0.4);
    justify-content: center;
    display: flex;
    z-index: 1;
    flex-direction: column;
`;

const Modal = styled.div`
    width: 334px;
    position: relative;
    height: 161px;
    flex-direction: column;
    background-color: white;
    align-items: center;
    border-radius: 12px;
    gap: 12px;
    z-index: 100;
    display: flex;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14),
        0px 1px 14px 0px rgba(0, 0, 0, 0.12);
`;
const Text = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    text-align: center;
`;
const Title = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    margin-bottom: 9px;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
`;

const StyledBtn = styled.button`
    width: 142px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 12px;
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.54px;
    border: none;
`;

export default CurrentReimbursement;
