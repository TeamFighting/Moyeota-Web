import { Calendar, Clock, Dollar } from "../../../../assets/svg";
import * as S from "./style";
import usePostDataStore from "../../../../zustand/store/PostDataStore";

function DetailBottom() {
  const { data } = usePostDataStore();
  const departureDateTime = new Date(data.departureTime);

  const formattedDateTime = departureDateTime
    .toLocaleString("ko-KR", {
      weekday: "short",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(".", "");
  return (
    <S.Bottom>
      <S.DescriptionTag>
        <S.Staus>
          <S.Tags>
            <S.Tag>{data.vehicle === "일반" ? "일반택시" : "밴택시"}</S.Tag>
            <S.Tag>
              {data.sameGenderStatus === "YES" ? "동성끼리" : "성별무관"}
            </S.Tag>
            <S.Tag>{data.category}</S.Tag>
          </S.Tags>
          <S.GateringTag>
            모집중 {data.numberOfParticipants}/{data.numberOfRecruitment}
          </S.GateringTag>
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
              <div>{formattedDateTime} 출발</div>
            </div>
          </div>
          <div style={{ flexDirection: "row", display: "flex", gap: "11px" }}>
            <Clock width="16" height="16" />
            <div>{Math.floor(data.duration / 60)}분 소요</div>
          </div>
          <div style={{ flexDirection: "row", display: "flex", gap: "11px" }}>
            <Dollar width="16" height="16" />
            <div style={{ flexDirection: "row", display: "flex", gap: "5px" }}>
              <div style={{ color: "#7E7E7E" }}>예상 금액</div>총{" "}
              {data.fare.toLocaleString()}원 - 1인당{" "}
              {(data.fare / data.numberOfRecruitment).toLocaleString()}원 (
              {data.numberOfRecruitment}인)
            </div>
          </div>
        </div>
      </S.TextDescription>
    </S.Bottom>
  );
}

export default DetailBottom;
