import {
  ChevronRight,
  LionProfile,
  LocationFrom,
  LocationMarker,
} from "../../../../assets/svg";
import * as S from "./style";
import createAgo from "../../../MainPage/Components/SingleContent/createAgo";
import usePostDataStore from "../../../../zustand/store/PostDataStore";

function DetailBody() {
  const { data } = usePostDataStore();
  const ago = createAgo(data.createAt);

  let gender;
  if (!data.userGender) {
    gender = "남";
  } else {
    gender = "여";
  }
  return (
    <S.Body>
      <S.Profile>
        <LionProfile width="86px" height="86px" />
      </S.Profile>
      <S.Content>
        <S.Explanation>
          <S.ContentTitle>
            <S.Title>{data.userName} 님의 </S.Title>
            <S.Title>'{data.title}'은 어때요?</S.Title>
          </S.ContentTitle>
          <S.ContentDetail>
            {gender}/{ago}/{data.view}명 조회
          </S.ContentDetail>
        </S.Explanation>
        <S.MapSample
          src="../../../public/png/MapSample.png"
          width="100%"
          height="100%"
        />
        <S.Route>
          <S.From>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <LocationFrom width="24" height="64" />
              <S.Text>
                <S.StartPointLocation>{data.departure}</S.StartPointLocation>
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
                <S.StartPointLocation>{data.destination}</S.StartPointLocation>
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
