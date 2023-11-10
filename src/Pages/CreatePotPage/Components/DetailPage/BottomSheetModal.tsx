import PropTypes from "prop-types";
import styled from "styled-components";
import React, { useEffect } from "react";
interface BottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const handleResize = () => {
    const windowHeight = window.innerHeight;
    const contentHeight = windowHeight * 0.3;

    setSheetHeight(contentHeight);
  };

  const [sheetHeight, setSheetHeight] = React.useState<number>(() => {
    return window.innerHeight * 0.3;
  });

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <BottomSheetContainer>
      <BottomSheetContent style={{ height: `${sheetHeight}px` }}>
        <Handler />
        <UpdateText>팟 수정하기</UpdateText>
        <DeleteText>팟 삭제하기</DeleteText>
        <CancleText onClick={onClose}>취소</CancleText>
      </BottomSheetContent>
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
`;
const BottomSheetContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  background: white;
  width: 100%;
  overflow-y: auto;
  padding: 13px;
  border-radius: 26px 26px 0px 0px;
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
`;

const UpdateText = styled.div`
  color: var(--Gray-Text-3, #343434);
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 157%; /* 34.54px */
  margin-bottom: 30px;
  text-align: center;
`;

const DeleteText = styled.div`
  color: var(--Green-Text, #139b59);
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 157%; /* 34.54px */
  margin-bottom: 30px;
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
