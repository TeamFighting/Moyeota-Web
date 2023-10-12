import * as S from "./style";
import CreateHeader from "./CreateHeader";
import CreateBody from "./CreateBody";

function createPotPage() {
  return (
    <>
      <S.Container>
        <CreateHeader></CreateHeader>
        <CreateBody></CreateBody>
      </S.Container>
    </>
  );
}

export default createPotPage;
