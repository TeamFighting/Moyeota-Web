import Header from './Header';
import Body from './Body';
import { useLocation } from 'react-router';
import { CurrentReimburseStore } from '../../../state/store/CurrentReimburseStore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Bottom from './Bottom';
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
    const [modalOpen, setModalOpen] = useState(false);
    const [modalName, setModalName] = useState('default');
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
        setModalName('Finish');
        setModalOpen(false);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalName('default');
    };

    const goMainpage = () => {
        setModalOpen(false);
        window.location.href = '/mainpage';
    };

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Header />
            <Body setModalOpen={setModalOpen} data={data} />
            <Bottom reimburseData={data} />
            {/* <Buttons
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80px',
                    backgroundColor: '#fff',
                }}
            >
                <StyledBtn onClick={() => closeModal()} style={{ width: '90%', backgroundColor: '#1EDD81' }}>
                    정산 완료
                </StyledBtn>
            </Buttons> */}
            {modalOpen ? (
                modalName == 'default' ? (
                    <ModalWrapper>
                        <Modal style={{ gap: '14px' }}>
                            <Text>
                                <Title>
                                    정산이 완료되었습니다! <br />
                                    정산 완료로 바꾸시겠습니까?
                                </Title>
                            </Text>
                            <Buttons>
                                <StyledBtn
                                    onClick={closeModal}
                                    style={{ backgroundColor: '#F5F6F8', color: '#5D5D5D', fontWeight: '500' }}
                                >
                                    대기
                                </StyledBtn>
                                <StyledBtn onClick={confirm} style={{ backgroundColor: '#1EDD81' }}>
                                    확인
                                </StyledBtn>
                            </Buttons>
                        </Modal>
                    </ModalWrapper>
                ) : (
                    <ModalWrapper>
                        <Modal>
                            <Text>
                                <Title>
                                    🎉 정산이 완료되었어요 ! <br />
                                </Title>
                                <Explanation>내 정보에서 계좌와 정산 내역을 관리할 수 있어요</Explanation>
                            </Text>
                            <Buttons>
                                <StyledBtn
                                    onClick={() => goMainpage()}
                                    style={{ width: '100%', backgroundColor: '#1EDD81' }}
                                >
                                    확인
                                </StyledBtn>
                            </Buttons>
                        </Modal>
                    </ModalWrapper>
                )
            ) : null}
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
    flex-direction: column;
    background-color: white;
    align-items: center;
    border-radius: 12px;
    gap: 22px;
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
const Explanation = styled.div`
    color: var(--Gray-Text-3, #343434);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 18.84px */
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
    width: 90%;
    margin-bottom: 10px;
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
