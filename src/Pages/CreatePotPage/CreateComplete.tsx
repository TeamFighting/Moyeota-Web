import * as S from "./style";
import CreateHeader from "./CreateHeader";
import { Divider, RobotProfile } from "../../assets/svg";
import CreateExitButton from "./Components/Button/CreateExitButton";

function createComplete() {
  return (
    <>
      <S.Container>
        <CreateHeader />
        <Divider width="100%" height="10" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: `calc(100vh - 252px)`,
          }}
        >
          <RobotProfile style={{ width: 84, height: 84, marginBottom: 37 }} />
          <S.CompleteWrapper>
            <S.Title>모연두 님의</S.Title>
            <S.Title>팟 생성이 완료되었어요!</S.Title>
          </S.CompleteWrapper>
        </div>
        <S.CompleteNote>
          • 파티원에게 매칭 신청이 올 때까지 기다려주세요.
        </S.CompleteNote>
        <CreateExitButton />
      </S.Container>
    </>
  );
}

export default createComplete;