import { ChevronRight, LocationFrom, LocationMarker } from "../../assets/svg";
import * as S from "./style";

function DetailBody() {
  return (
    <S.Body>
      <S.Content>
        <S.Explanation>
          <S.ContentTitle>
            <S.Title>상세 항목을 알려주세요 </S.Title>
          </S.ContentTitle>
        </S.Explanation>
        <S.InputStyle
          type="text"
          placeholder="지역, 목적지가 포함된 제목이면 더 좋아요"
        />
        <S.MapSample
          src="../../../public/png/Map.png"
          width="100%"
          height="100%"
        />
        <S.Route>
          <S.From>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <LocationFrom width="24" height="64" />
              <S.Text>
                <S.StartPointLocation>
                  서울 송파구 거여동 697
                </S.StartPointLocation>
                <S.StartPoint>출발지</S.StartPoint>
              </S.Text>
            </div>
            <S.Icon style={{ paddingTop: "3px" }}>
              <ChevronRight />
            </S.Icon>
          </S.From>
          <S.From>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <S.Icon
                style={{
                  height: "100%",
                  alignItems: "flex-start",
                  display: "flex",
                }}
              >
                <LocationMarker width="24" height="24" />
              </S.Icon>
              <S.Text>
                <S.StartPointLocation>
                  건국대학교 생명과학관부속동
                </S.StartPointLocation>
                <S.StartPoint>도착지</S.StartPoint>
              </S.Text>
            </div>
            <S.Icon style={{ paddingTop: "3px" }}>
              <ChevronRight />
            </S.Icon>
          </S.From>
        </S.Route>
      </S.Content>
    </S.Body>
  );
}

export default DetailBody;
