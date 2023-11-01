import { useRef } from "react";
import DetailHeader from "../DetailPage/DetailHeader";
import {
  ContentDetail,
  From,
  Icon,
  Route,
  StartPoint,
  StartPointLocation,
  Title,
  Text,
} from "../DetailPage/style";
import * as S from "./style";
import {
  ChevronRight,
  Destination,
  LocationFrom,
  LocationMarker,
} from "../../assets/svg";
import { useLocation } from "react-router";
import MatchKaKao from "./MatchKakao/MatchKakao";
function QuickMatchFinding() {
  const mapRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const { time, destination } = location.state;
  return (
    <div>
      <DetailHeader />
      <S.Container style={{ gap: "9px" }}>
        <S.Discription style={{ marginTop: "10px" }}>
          <Title>
            지금 가까운 팟을 <br />
            찾고 있어요
          </Title>
          <ContentDetail>조금만 기다려주세요</ContentDetail>
        </S.Discription>
        <div
          style={{
            width: "100vw",
            height: "330px",
            backgroundColor: "white",
            zIndex: "2",
            opacity: "0.5",
            marginTop: "10px",
          }}
        />
        <Icon
          style={{
            position: "absolute",
            zIndex: 3,
            top: "310px",
            left: "43vw",
            marginLeft: "-50px",
          }}
        >
          <Destination width="150" height="50" />
        </Icon>
        <div
          style={{
            position: "absolute",
            top: "200px",
            width: "100vw",
            height: "440px",
            backgroundColor: "aliceblue",
          }}
        >
          <MatchKaKao mapRef={mapRef} />
        </div>
        <Route
          style={{
            position: "absolute",
            top: "517px",
            height: "115px",
            zIndex: "2",
            backgroundColor: "white",
            paddingTop: "31px",
            paddingLeft: "25px",
            width: `${window.innerWidth - 25}px`,
          }}
        >
          <From
            style={{
              width: `${window.innerWidth - 100}px`,
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <LocationFrom width="24" height="64" />
              <Text>
                <StartPointLocation>공덕역 5호선</StartPointLocation>
                <StartPoint>출발지</StartPoint>
              </Text>
            </div>
            <Icon style={{ paddingTop: "3px" }}>
              <ChevronRight />
            </Icon>
          </From>
          <From
            style={{
              width: `${window.innerWidth - 100}px`,
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Icon
                style={{
                  height: "100%",
                  alignItems: "flex-start",
                  display: "flex",
                }}
              >
                <LocationMarker width="24" height="24" />
              </Icon>
              <Text>
                <StartPointLocation>{destination}</StartPointLocation>
                <StartPoint>도착지</StartPoint>
              </Text>
            </div>
            <Icon style={{ paddingTop: "3px" }}>
              <ChevronRight />
            </Icon>
          </From>
        </Route>
      </S.Container>
    </div>
  );
}

export default QuickMatchFinding;
