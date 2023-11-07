import styled from "styled-components";
import Profile from "../SingleContent/Profile";
import * as S from "../../style";
import ArrowRight from "../../../../../public/svg/ArrowRight.svg";
import LocationMarker from "../../../../../public/svg/LocationMarker.svg";
import ContentStore from "../../../../zustand/store/ContentStore";
import createAgo from "../SingleContent/createAgo";
import { Clock } from "../../../../assets/svg";
import getDays from "../SingleContent/getDays";
import ISOto12 from "../SingleContent/ISOto12";

function MarkerClickContent() {
  const { totalData } = ContentStore((state) => state);
  console.log("total0", totalData[0]);
  const data = totalData[0];
  const ago = createAgo(data.createdAt);
  const splitedDay = getDays(data.departureTime);
  const timePart = ISOto12(data.departureTime);
  return (
    <div
      style={{
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        zIndex: 100,
        position: "absolute",
        bottom: "17px",
        right: "50%",
        transform: "translate(57%, 0)",
      }}
    >
      <BriefWrapper>
        <Profile
          ago={ago}
          index={data.index}
          userName={data.userName}
          gender={data.gender}
          distance={data.distance}
        />
        <S.ContentTitle>{data.title}</S.ContentTitle>
        <div>
          <S.Info>
            <S.Route>
              <LocationMarker />
              <S.From> {data.departure} </S.From>
              <ArrowRight />
              <S.To> {data.destination} </S.To>
            </S.Route>
            <S.Time>
              <Clock width="14" />
              <S.StartTime>
                {splitedDay[1]}월{splitedDay[2]}일 ({splitedDay[3]}) {timePart}{" "}
                출발
              </S.StartTime>
            </S.Time>
          </S.Info>
        </div>
      </BriefWrapper>
    </div>
  );
}

const BriefWrapper = styled.div`
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  width: 335px;
  height: 200px;
  background-color: white;
`;

export default MarkerClickContent;
