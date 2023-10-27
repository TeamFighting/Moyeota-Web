import { ChevronRight } from "../../assets/svg";
import * as S from "./style";
import TimeModal from "./Components/Modal/TimeModal";
import DateModal from "./Components/Modal/DateModal";
import { useState } from "react";
function CreateBottom() {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const handleTimeModal = () => {
    setIsTimeModalOpen(true);
  };
  const handleDateModal = () => {
    setIsDateModalOpen(true);
  };
  return (
    <S.Bottom>
      <S.Wrapper
        style={{
          paddingBottom: "40px",
        }}
      >
        <S.TextWrapper onClick={handleDateModal}>
          <S.BottomTitle>출발시간</S.BottomTitle>
          <S.Description>탑승일시를 선택해주세요</S.Description>
        </S.TextWrapper>
        <ChevronRight width="24" height="24" />
      </S.Wrapper>
      <S.Wrapper style={{ paddingBottom: "10px" }} onClick={handleTimeModal}>
        <S.TextWrapper>
          <S.BottomTitle>이동수단 및 인원</S.BottomTitle>
          <S.Description>이동수단 및 인원을 선택해주세요</S.Description>
        </S.TextWrapper>
        <ChevronRight
          width="24"
          height="24"
          style={{ marginLeft: "100px", marginTop: "13px" }}
        />
      </S.Wrapper>
      {isTimeModalOpen && (
        <TimeModal closeModal={() => setIsTimeModalOpen(false)} />
      )}
      {isDateModalOpen && (
        <DateModal closeModal={() => setIsDateModalOpen(false)} />
      )}
    </S.Bottom>
  );
}

export default CreateBottom;
