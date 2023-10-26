import * as S from "./style";

function CreatePrice() {
  return (
    <S.Bottom>
      <S.PayBox>
        <S.PayBoxTitle>예상금액</S.PayBoxTitle>
        <S.PayBoxDescription>
          총 20,960원 / 1인당 6,987(현재시간 기준)
        </S.PayBoxDescription>
      </S.PayBox>
    </S.Bottom>
  );
}

export default CreatePrice;
