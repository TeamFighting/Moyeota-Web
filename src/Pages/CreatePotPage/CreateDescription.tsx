import * as S from "./style";

function CreateDescription() {
  return (
    <S.Bottom>
      <S.Subtitle>팟 설명을 작성해주세요 (선택)</S.Subtitle>
      <S.InputDescription
        placeholder={`팟 설명을 자유롭게 작성해주세요
구체적일수록 매칭 확률이 올라가요
(예시: 콘서트, 등하교, 출퇴근, 공항이동 등)`}
      />
    </S.Bottom>
  );
}

export default CreateDescription;
