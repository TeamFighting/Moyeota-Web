import * as S from "./style";
import CreateHeader from "./CreateHeader";
import CreateBody from "./CreateBody";
import CreateBottom from "./CreateBottom";
import CreateDescription from "./CreateDescription";
import { Divider } from "../../assets/svg";
import CreatePotButton from "./CreatePotButton";

function createPotPage() {
  return (
    <>
      <S.Container>
        <CreateHeader />
        <CreateBody />
        <Divider width="100%" height="10" />
        <CreateBottom />
        <Divider width="100%" height="10" />
        <CreateDescription />
        <CreatePotButton />
      </S.Container>
    </>
  );
}

export default createPotPage;
