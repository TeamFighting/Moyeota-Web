import { ChangeEvent } from "react";
import PotCreateStore from "../../zustand/store/PotCreateStore";
import * as S from "./style";

function CreateDescription() {
  const description = PotCreateStore((state) => state.description);
  const setDescription = PotCreateStore((state) => state.setDescription);

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 100) {
      setDescription(inputValue);
    } else {
      setDescription(inputValue.slice(0, 100));
    }
  };

  return (
    <S.Bottom>
      <S.Subtitle>팟 설명을 작성해주세요 (선택)</S.Subtitle>
      <S.InputDescriptionWrapper>
        <S.InputDescription
          placeholder={`팟 설명을 자유롭게 작성해주세요
구체적일수록 매칭 확률이 올라가요
(예시: 콘서트, 등하교, 출퇴근, 공항이동 등)`}
          value={description}
          onChange={handleDescriptionChange}
        />
        <S.CharacterCount>{description.length}/100</S.CharacterCount>
      </S.InputDescriptionWrapper>
    </S.Bottom>
  );
}

export default CreateDescription;
