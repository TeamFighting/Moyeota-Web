import * as S from "./style";
import CreateHeader from "./CreateHeader";
import CreateBody from "./CreateBody";
import CreateBottom from "./CreateBottom";
import CreatePrice from "./CreatePrice";
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
        <CreatePrice />
        <Divider width="100%" height="10" />
        {/* <CreatePotButton /> */}
        <CreateDescription />
      </S.Container>
    </>
  );
}

export default createPotPage;
