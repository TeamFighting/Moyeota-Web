import styled from "styled-components";
import LatLngStore from "../../zustand/store/LatLngstore";
import { useState } from "react";

function LocationHeader() {
  const geocoder = new kakao.maps.services.Geocoder();
  const currentLat = LatLngStore((state) => state.currentLat);
  const currentLng = LatLngStore((state) => state.currentLng);
  const coord = new kakao.maps.LatLng(currentLat, currentLng);
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
