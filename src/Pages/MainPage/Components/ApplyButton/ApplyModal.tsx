import axios from "axios";
import { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import styled from "styled-components";

interface ModalProps {
  setIsOpen: (setIsOpen: boolean) => void;
  isFull: boolean;
  postId: number;
}
function ApplyModal({ setIsOpen, postId, isFull }: ModalProps) {
  const ref = useOnclickOutside(() => {
    setIsOpen(false);
  });
  const closeModal = () => {
    setIsOpen(false);
  };
  const [errorCode, setErrorCode] = useState<number>(0);

  async function applyParty(postId: number) {
    try {
      const res = await axios.post(
        `http://moyeota.shop/api/participation-details/posts/${postId}`,
        {
          postId: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AUTH_BEARER_TOKEN}`,
          },
        }
      );
    } catch (e: unknown) {
      // console.log("e", e.response.data.code);
      const eCode = e.response.data.code;
      setErrorCode(eCode);
    }
  }
  console.log("errorCode", errorCode);
  if (isFull) {
    return (
      <ModalWrapper>
        <Modal ref={ref}>
          <Text>
            <Title>이미 모집 완료된 팟입니다.</Title>
            <Explain>팟을 만들거나 다른 팟을 이용해보세요</Explain>
          </Text>
          <CloseButton onClick={closeModal} type="button">
            닫기
          </CloseButton>
        </Modal>
      </ModalWrapper>
    );
  } else {
    return (
      <ModalWrapper>
        <Modal ref={ref}>
          <Text>
            <Title>매칭을 신청할까요 ?</Title>
          </Text>
          <Buttons>
            <StyledBtn
              onClick={closeModal}
              style={{ backgroundColor: "#F5F6F8", color: "#5D5D5D" }}
            >
              아니오
            </StyledBtn>
            <StyledBtn
              onClick={() => {
                applyParty(postId);
              }}
              style={{ backgroundColor: "#1EDD81" }}
            >
              예
            </StyledBtn>
          </Buttons>
        </Modal>
      </ModalWrapper>
    );
  }
}
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
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 38px;
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
  width: 291px;
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
  height: 161px;
  flex-direction: column;
  background-color: white;
  align-items: center;
  border-radius: 12px;
  gap: 29px;
  z-index: 100;
  display: flex;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  animation: fadeIn 400ms;
  transition: all 400ms ease-in-out 2s;
`;
export default ApplyModal;
