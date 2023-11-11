import styled from "styled-components";
interface DeleteModalProps {
  onClose: () => void;
  children?: React.ReactNode; // children을 선택적으로 변경
}

function DeleteModal({ onClose }: DeleteModalProps) {
  return (
    <ModalWrapper>
      <Modal>
        <Text>
          <Title>정말로 삭제하시겠습니까?</Title>
        </Text>
        <Buttons>
          <StyledBtn
            onClick={onClose}
            style={{ backgroundColor: "#F5F6F8", color: "#5D5D5D" }}
          >
            아니오
          </StyledBtn>
          <StyledBtn onClick={onClose} style={{ backgroundColor: "#1EDD81" }}>
            예
          </StyledBtn>
        </Buttons>
      </Modal>
    </ModalWrapper>
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
  width: 309px;
  position: relative;
  height: 161px;
  flex-direction: column;
  background-color: white;
  align-items: center;
  border-radius: 12px;
  gap: 22px;
  z-index: 100;
  display: flex;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
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
