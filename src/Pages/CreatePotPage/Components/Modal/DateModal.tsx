import styled from "styled-components";
import { useState } from "react";

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
        <CloseButton onClick={handleModalClose}>선택완료</CloseButton>
      </Modal>
    </ModalWrapper>
  );
}
const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0px 16px 135px;
`;

const SwitchInput = styled.input`
  position: relative;
  appearance: none;
  width: 40px;
  height: 24px;
  background: ${(props) => (props.checked ? "#1edd81" : "#ccc")};
  border-radius: 30px;
  outline: none;
  transition: background 0.3s;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 2px;
    background: #ffffff;
    transform: translateX(${(props) => (props.checked ? "18px" : "1.5px")});
    transition: transform 0.3s;
  }
`;
const CarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 38px;
`;
const BoxTitle = styled.div`
  color: #343434;
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 600;
  padding-top: 17px;
  padding-bottom: 17px;
  padding-left: 19px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 287px;
  height: 56px;
  background-color: #f5f6f8;
  border-radius: 12px;
`;
const Number = styled.div`
  font-size: 16px;
  font-weight: 500;
  font-family: Pretendard;
  color: #7e7e7e;
`;
const InnerBox = styled.div`
  width: 29px;
  height: 29px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 8px 12px 8px;
`;
const Text = styled.div`
  display: flex;
  gap: 7px;
`;
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
const Explain = styled.div`
  color: var(--Gray-Text-3, #343434);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`;
const SubExplain = styled.div`
  color: #9a9a9a;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 157%; /* 18.84px */
  margin-top: 2px;
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
export default DateModal;
