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
        <CloseButton onClick={onClose}>취소</CloseButton>
        {children}
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
`;

const BottomSheetContent = styled.div`
  background: white;
  width: 100%;
  overflow-y: auto;
  padding: 50px;
  border-radius: 26px 26px 0px 0px;
`;

const CloseButton = styled.button`
  margin-bottom: 16px;
`;
