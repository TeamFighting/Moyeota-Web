import styled from "styled-components";
interface TimeModalProps {
  closeModal: () => void;
}

function TimeModal({ closeModal }: TimeModalProps) {
  const handleModalClose = () => {
    closeModal();
  };
  return (
    <ModalWrapper>
      <Modal>
        <Text>
          <Title>이동 수단 및 인원</Title>
          <Explain>일반 승용 택시</Explain>
        </Text>
        <CloseButton onClick={handleModalClose}>선택완료</CloseButton>
      </Modal>
    </ModalWrapper>
  );
}
const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding-top: 30px;
  padding-bottom: 22px;
`;
const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`;
const Explain = styled.div`
  color: var(--Gray-Text-3, #343434);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 157%; /* 18.84px */
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
  z-index: 1;
  flex-direction: column;
`;
const Modal = styled.div`
  width: 309px;
  position: relative;
  height: 424px;
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
export default TimeModal;
