import styled from "styled-components";
import { useState } from "react";

function LocationHeader() {
  const geocoder = new kakao.maps.services.Geocoder();
  const latitude = Number(localStorage.getItem("latitude"));
  const longitude = Number(localStorage.getItem("longitude"));
  const coord = new kakao.maps.LatLng(latitude, longitude);
  const [location, setLocation] = useState<string>("");
  const callback = function (
    result: {
      address: {
        region_1depth_name: string;
        region_2depth_name: string;
        address_name: string;
      };
    }[],
    status: kakao.maps.services.Status
  ) {
    if (status === kakao.maps.services.Status.OK) {
      const location =
        result[0].address.region_1depth_name +
        " " +
        result[0].address.region_2depth_name;
      setLocation(location);
    }
  };

  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

  return <Location>{location}</Location>;
}

const Location = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-left: 14px;
`;
export default LocationHeader;
