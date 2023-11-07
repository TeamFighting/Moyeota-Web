import { useEffect, useMemo, useRef, useState } from "react";
import ContentStore from "../../../zustand/store/ContentStore";
import axios from "axios";
import { useQuickPotStore } from "../../../zustand/store/QuickPotStore";

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

  const { quickPot } = useQuickPotStore();
  const departures = useMemo(
    () => totalData.map((data) => data.departure),
    [totalData]
  );

  const [array, setArray] = useState<ArrayElement[]>([]);

  console.log("array", array);

  useEffect(() => {
    const fetchDestinations = async () => {
      if (quickPot.length !== 0) {
        const promises = quickPot.map((data) => {
          axios
            .get(`http://moyeota.shop/api/distance/keyword`, {
              params: { query: `${data.departure}` },
            })
            .then((res) => {
              setArray((prev) => [...prev, res.data]);
              console.log(res);
            });
        });
        const results = await Promise.all(promises);
        console.log("results", results);
      } else {
        const promises = departures.map((data) =>
          axios.get(`http://moyeota.shop/api/distance/keyword`, {
            params: { query: `${data}` },
          })
        );
        const results = await Promise.all(promises);
        const data = results.map((result) => result.data);
        setArray(data);
      }
    };

    fetchDestinations();
  }, [departures, quickPot]);

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(latitude, longitude);

    const mapOptions = {
      center: location,
      zoom: 13,
      zoomControl: false,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    if (array.length !== 0) {
      array.map((data) => {
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
