import { Calendar, Clock, Dollar } from "../../../../assets/svg";
import * as S from "./style";

interface DetailBottomProps {
  fare: number;
  duration: number;
  splitedTime: string[];
  timePart: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  participants: number;
  recruitment: number;
}
function DetailBottom() {
  return (
    <S.Bottom>
      <S.DescriptionTag>
        <S.Staus>
          <S.Tags>
            <S.Tag>일반택시</S.Tag>
            <S.Tag>성별무관</S.Tag>
            <S.Tag>출퇴근</S.Tag>
          </S.Tags>
          <S.GateringTag>모집중 1/4</S.GateringTag>
        </S.Staus>
      </S.DescriptionTag>
      <S.TextDescription>
        <div>일정 및 시간</div>
        <div
          style={{
            marginTop: "12px",
            fontSize: "14px",
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <div style={{ flexDirection: "row", display: "flex", gap: "11px" }}>
            <Calendar width="16" height="16" />
            <div>
              <div>08월 15일 (화) 오전 11:30 출발</div>
            </div>
          </div>
          <div style={{ flexDirection: "row", display: "flex", gap: "11px" }}>
            <Clock width="16" height="16" />
            <div>30분 소요</div>
          </div>
          <div style={{ flexDirection: "row", display: "flex", gap: "11px" }}>
            <Dollar width="16" height="16" />
            <div style={{ flexDirection: "row", display: "flex", gap: "5px" }}>
              <div style={{ color: "#7E7E7E" }}>예상 금액</div>총 12,700원 -
              1인당 6,350원 (2인)
            </div>
          </div>
        </div>
      </S.TextDescription>
    </S.Bottom>
  );
}

export default DetailBottom;
