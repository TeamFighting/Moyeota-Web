import { ChevronRight } from "../../assets/svg";
import * as S from "./style";

function CreateBottom() {
  return (
    <S.Bottom>
      <S.Wrapper style={{ paddingBottom: "35px" }}>
        <S.TextWrapper>
          <S.BottomTitle>출발시간</S.BottomTitle>
          <S.Description>탑승일시를 선택해주세요</S.Description>
        </S.TextWrapper>
        <ChevronRight
          width="24"
          height="24"
          style={{ marginLeft: "150px", marginTop: "13px" }}
        />
      </S.Wrapper>
      <S.Wrapper style={{ paddingBottom: "6px" }}>
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
    </S.Bottom>
  );
}

export default CreateBottom;
