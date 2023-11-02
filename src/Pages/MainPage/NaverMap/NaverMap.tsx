import { useEffect, useMemo, useRef, useState } from "react";
import ContentStore from "../../../zustand/store/ContentStore";
import axios from "axios";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any;
  }
}

interface ArrayElement {
  data: {
    x: number;
    y: number;
    place_name: string;
    road_address_name: string;
  };
  status: string;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function NaverMap() {
  const mapElement = useRef(null);

  const { naver } = window;

  const latitude = Number(localStorage.getItem("latitude"));

  const longitude = Number(localStorage.getItem("longitude"));

  const { totalData } = ContentStore();

  const departure = useMemo(
    () => totalData.map((data) => data.departure),
    [totalData]
  );

  const [array, setArray] = useState<ArrayElement[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const promises = departure.map((data) =>
        axios.get(`http://moyeota.shop/api/distance/keyword`, {
          params: { query: `${data}` },
        })
      );
      const results = await Promise.all(promises);
      const data = results.map((result) => result.data);
      setArray(data);
    };

    fetchDestinations();
  }, [departure]);

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(latitude, longitude);

    const mapOptions = {
      center: location,
      zoom: 15,
      zoomControl: false,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    if (array.length !== 0) {
      console.log("테스트", array);
      array.map((data) => {
        console.log(data);
        console.log(data.data.x, data.data.y);
        new naver.maps.Marker({
          position: new naver.maps.LatLng(data.data.y, data.data.x),
          map,
          icon: {
            url: "../../../public/svg/GreenLocationMarker.svg",
            size: new naver.maps.Size(50, 52),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(25, 26),
          },
        });
      });
    }
    new naver.maps.Marker({
      position: location,
      map,
      icon: {
        url: "../../../public/svg/CurrentLocationIcon.svg",
        size: new naver.maps.Size(50, 52),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26),
      },
    });
  }, [array]);

  return (
    <>
      <div ref={mapElement} style={{ height: "100%" }} />
    </>
  );
}

export default NaverMap;
