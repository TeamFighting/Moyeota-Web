// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import PropTypes from "prop-types";
import styled from "styled-components";
import React, { useState } from "react";
import DeleteModal from "../Modal/DeleteModal";

interface BottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [sheetHeight] = React.useState<number>(() => {
    return window.innerHeight * (2.5 / 8);
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <BottomSheetContainer style={{ display: isOpen ? "flex" : "none" }}>
      <BottomSheetContent style={{ height: `${sheetHeight}px` }}>
        <Handler />
        <UpdateText>팟 수정하기</UpdateText>
        <DeleteText onClick={handleOpenDeleteModal}>팟 삭제하기</DeleteText>
        <CancleText onClick={onClose}>취소</CancleText>
      </BottomSheetContent>
      {isDeleteModalOpen && (
        <DeleteModal onClose={handleCloseDeleteModal}>
          {/* DeleteModal에 필요한 내용 전달 */}
        </DeleteModal>
      )}
    </BottomSheetContainer>
  );
};

BottomSheetModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default BottomSheetModal;

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
  z-index: 3;
`;

const BottomSheetContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  width: 100%;
  overflow-y: auto;
  border-radius: 26px 26px 0px 0px;
  z-index: 4;
`;

const Handler = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  border-radius: 26px;
  background-color: #ededed;
  width: 50px;
  height: 7px;
  margin-top: 14px;
`;

const UpdateText = styled.div`
  color: var(--Gray-Text-3, #343434);
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 157%; /* 34.54px */
  padding-bottom: 40px;
  text-align: center;
  padding-top: 50px;
`;

const DeleteText = styled.div`
  color: var(--Green-Text, #139b59);
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 157%; /* 34.54px */
  padding-bottom: 40px;
  text-align: center;
`;

const CancleText = styled.div`
  color: var(--Gray-Text-1, #9a9a9a);
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 157%; /* 34.54px */
  text-align: center;
`;
