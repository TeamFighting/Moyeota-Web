import styled from "styled-components";

interface DateModalProps {
  closeModal: () => void;
}

function DateModal({ closeModal }: DateModalProps) {
  const handleModalClose = () => {
    closeModal();
  };

  return (
    <ModalWrapper>
      <Modal>
        <Title>출발시간</Title>
        <CloseButton onClick={handleModalClose}>선택완료</CloseButton>
      </Modal>
    </ModalWrapper>
  );
}

const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  padding-top: 21px;
  padding-bottom: 40px;
`;

const CloseButton = styled.button`
  width: 287px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  color: white;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.54px;
  border: none;
  background: var(--Green-Button, #1edd81);
`;
const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  align-items: center;
  background-color: #00000023;
  justify-content: center;
  display: flex;
  z-index: 999;
  flex-direction: column;
`;
const Modal = styled.div`
  width: 309px;
  position: relative;
  height: 346px;
  flex-direction: column;
  background-color: white;
  align-items: center;
  border-radius: 11px;
  z-index: 1000;
  display: flex;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  animation: fadeIn 400ms;
  transition: all 400ms ease-in-out 2s;
`;
export default DateModal;
