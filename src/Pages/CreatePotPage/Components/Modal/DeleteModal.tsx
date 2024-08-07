import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../../../axios';

interface DeleteModalProps {
    onClose: () => void;
    // children?: React.ReactNode;
    postId: number;
}

function DeleteModal({ postId, onClose }: DeleteModalProps) {
    const [isDeleted, setIsDeleted] = React.useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const ToMainPage = () => {
        navigate('/mainpage');
    };

    const handleDelete = async () => {
        try {
            const response = await instance.delete(`/posts/${postId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status == 200) {
                setIsDeleted(true);
            } else {
                console.error('삭제 실패');
            }
        } catch (e: any) {
            if (e.response && e.response.status === 401) {
                alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
                window.location.href = '/login';
            } else {
                console.error(e);
                alert('에러가 발생했습니다: ' + e.message + '관리자에게 문의해주세요');
            }
        }
    };

    return (
        <ModalWrapper>
            <Modal>
                <Text>
                    <Title>{isDeleted ? '삭제되었습니다' : '정말로 삭제하시겠습니까?'}</Title>
                </Text>
                {isDeleted ? (
                    <Buttons>
                        <StyledBtn
                            onClick={() => {
                                onClose();
                                ToMainPage(); // Call handleConfirm when the "예" (Yes) button is clicked
                            }}
                            style={{ backgroundColor: '#1EDD81', width: 299 }}
                        >
                            확인
                        </StyledBtn>
                    </Buttons>
                ) : (
                    <Buttons>
                        <StyledBtn onClick={onClose} style={{ backgroundColor: '#F5F6F8', color: '#5D5D5D' }}>
                            아니오
                        </StyledBtn>
                        <StyledBtn onClick={handleDelete} style={{ backgroundColor: '#1EDD81' }}>
                            예
                        </StyledBtn>
                    </Buttons>
                )}
            </Modal>
        </ModalWrapper>
    );
}
const ModalWrapper = styled.div`
    width: 100vw;
    height: 100dvh;
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

export default DeleteModal;
