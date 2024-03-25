// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useState } from 'react';
import DeleteModal from '../Modal/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '../../../../assets/svg';
import BottomSheetHandle from '../../../MainPage/Components/BottomSheet/BottomSheetHandle';
import useOnclickOutside from 'react-cool-onclickoutside';
import useUpdateModalStore from '../../../../state/store/UpdateModalStore';

interface EditDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    postId: number;
}

const EditDeleteModal = ({ postId, isOpen, onClose }: EditDeleteModalProps) => {
    const [sheetHeight] = React.useState<number>(() => {
        return window.innerHeight * (2.5 / 8);
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { closeModal } = useUpdateModalStore();

    const ref = useOnclickOutside(() => {
        setIsDeleteModalOpen(false);
    });
    const navigate = useNavigate();
    const goToUpdate = () => {
        navigate('/updatePotPage');
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        closeModal();
        setIsDeleteModalOpen(false);
    };

    return (
        <BottomSheetContainer ref={ref} style={{ display: isOpen ? 'flex' : 'none' }}>
            <BottomSheetContent style={{ height: `${sheetHeight}px` }}>
                <BottomSheetHandle />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '7px',
                        height: '80px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <PencilIcon width="24" height="24" />
                    </div>
                    <UpdateText onClick={goToUpdate}>수정하기</UpdateText>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '7px',
                        height: '80px',
                    }}
                >
                    <div style={{ display: 'flex' }}>
                        <TrashIcon width="24" height="24" />
                    </div>
                    <DeleteText onClick={handleOpenDeleteModal}>삭제하기</DeleteText>
                </div>
                <CancleText onClick={onClose}>취소</CancleText>
            </BottomSheetContent>
            {isDeleteModalOpen && <DeleteModal postId={postId} onClose={handleCloseDeleteModal}></DeleteModal>}
        </BottomSheetContainer>
    );
};

// EditDeleteModal.propTypes = {
//     isOpen: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired,
//     children: PropTypes.node.isRequired,
// };

export default EditDeleteModal;

const BottomSheetContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(65, 65, 65, 0.4);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 1000;
`;

const BottomSheetContent = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    background-color: white;
    border-radius: 26px 26px 0px 0px;
`;

const UpdateText = styled.span`
    color: var(--Gray-Text-3, #343434);
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 157%; /* 34.54px */
    text-align: center;
`;

const DeleteText = styled.div`
    color: #f00;
    text-align: center;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 34.54px */
`;

const CancleText = styled.div`
    color: var(--Gray-Text-1, #9a9a9a);
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 34.54px */
    text-align: center;
    padding-top: 20px;
`;
