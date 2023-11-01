import styled from "styled-components";
import ModalStore from "../../../../zustand/store/ModalStore";
import axios from "axios";
import { useAppliedPartyStore } from "../../../../zustand/store/AppliedPartyStore";

interface ApplyButtonProps {
  postId: number;
}

function ApplyButton({ postId }: ApplyButtonProps) {
  const { setIsModalOpen, modalOpen } = ModalStore();
  const { appliedParty, deleteAppliedParty } = useAppliedPartyStore();
  console.log("appliedParty", appliedParty);

  const handleApply = () => {
    setIsModalOpen(true, "apply");
  };

  const handleCancel = () => {
    setIsModalOpen(true, "cancel");
  };

  if (appliedParty.length !== 0) {
    return appliedParty.map((party) => {
      if (party.postId === postId) {
        return (
          <Wrapper>
            <ButtonCancel
              onClick={() => {
                handleCancel();
              }}
              type="button"
            >
              신청 취소하기
            </ButtonCancel>
          </Wrapper>
        );
      } else {
        return (
          <Wrapper>
            <Button onClick={handleApply} type="button">
              매칭 신청하기
            </Button>
          </Wrapper>
        );
      }
    });
  } else {
    return (
      <Wrapper>
        <Button onClick={handleApply} type="button">
          매칭 신청하기
        </Button>
      </Wrapper>
    );
  }
}

const ButtonCancel = styled.button`
  background: #f1f1f1;
  width: 335px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  color: #5d5d5d;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.54px;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 128px;
  background-color: white;
  bottom: 0;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  width: 335px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--Green-Button, #1edd81);
  border: none;
  font-size: 16px;
  color: white;
  color: #fff;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.54px;
`;

export default ApplyButton;
