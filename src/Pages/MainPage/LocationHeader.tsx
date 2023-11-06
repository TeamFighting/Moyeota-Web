import { useEffect, useState } from "react";
import styled from "styled-components";
import CurrentLocationStore from "../../zustand/store/CurrentLocation";
declare global {
  interface Window {
    kakao: {
      maps: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        LatLng: any;
        services: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Geocoder: any;
        };
      };
    };
  }
}

function LocationHeader() {
  const latitude = Number(localStorage.getItem("latitude"));
  const longitude = Number(localStorage.getItem("longitude"));
  const [location, setLocation] = useState<string>("");
  const { setCurrentLocation } = CurrentLocationStore();

  const callback = function (
    result: {
      road_address: {
        region_1depth_name: string;
        region_2depth_name: string;
        address_name: string;
        building_name: string;
      } | null;
    }[],
    status: kakao.maps.services.Status
  ) {
    if (status === kakao.maps.services.Status.OK) {
      const location =
        result[0].road_address?.region_1depth_name +
        " " +
        result[0].road_address?.region_2depth_name;
      setLocation(location);
      console.log(result[0].road_address);
      setCurrentLocation(result[0].road_address);
    }
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2Address(longitude, latitude, callback);
    }
  }, [latitude, longitude]);

  return <Location>{location}</Location>;
}

const Location = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-left: 14px;
`;
export default LocationHeader;
