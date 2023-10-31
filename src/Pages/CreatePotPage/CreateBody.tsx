import { ChevronRight, LocationFrom, LocationMarker } from "../../assets/svg";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

interface CreateBodyProps {
  destination?: string;
}

function CreateBody({ destination }: CreateBodyProps) {
  const navigate = useNavigate();
  const NavigateToDestination = () => {
    navigate("/destinationPage");
  };

  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(
          longitude,
          latitude,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              setCurrentLocation(address);
            }
          }
        );
      });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

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
                  {currentLocation
                    ? currentLocation
                    : "현재 위치를 가져오는 중..."}
                </S.StartPointLocation>
                <S.StartPoint>출발지</S.StartPoint>
              </S.Text>
            </div>
            <S.Icon style={{ paddingTop: "3px" }}>
              <ChevronRight width="24" height="24" />
            </S.Icon>
          </S.From>
          <S.From onClick={NavigateToDestination}>
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
                  {destination || "도착지를 입력해주세요"}
                </S.StartPointLocation>
                <S.StartPoint>도착지</S.StartPoint>
              </S.Text>
            </div>
            <S.Icon style={{ paddingTop: "3px" }}>
              <ChevronRight width="24" height="24" />
            </S.Icon>
          </S.From>
        </S.Route>
      </S.Content>
    </S.Body>
  );
}

export default CreateBody;
