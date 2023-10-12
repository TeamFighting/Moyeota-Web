import * as S from "./style";
import CreateHeader from "./CreateHeader";
import CreateBody from "./CreateBody";
import CreateBottom from "./CreateBottom";
import { Divider } from "../../assets/svg";

function createPotPage() {
  return (
    <>
      <S.Container>
        <CreateHeader></CreateHeader>
        <CreateBody></CreateBody>
        <Divider width="100%" height="10" />
        <CreateBottom></CreateBottom>
        <Divider width="100%" height="10" />
      </S.Container>
    </>
  );
}

export default createPotPage;
