import { useEffect, useMemo, useRef, useState } from "react";
import ContentStore from "../../../zustand/store/ContentStore";
import axios from "axios";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function NaverMap() {
  const mapElement = useRef(null);

  const { naver } = window;

  const latitude = Number(localStorage.getItem("latitude"));

  const longitude = Number(localStorage.getItem("longitude"));

  const { totalData } = ContentStore();

  const destination = useMemo(
    () => totalData.map((data) => data.destination),
    [totalData]
  );

  const [array, setArray] = useState([{}]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const promises = destination.map((data) =>
        axios.get(`http://moyeota.shop/api/distance/keyword`, {
          params: { query: `${data}` },
        })
      );
      const results = await Promise.all(promises);
      const data = results.map((result) => result.data);
      console.log("data", data);
      setArray(data);
    };

    fetchDestinations();
  }, [destination]);

  console.log("array", array);

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(latitude, longitude);

    // const markerlocation = array.map(
    //   (data) => new naver.maps.LatLng(data.data.x, longitude)
    // );
    const mapOptions = {
      center: location,
      zoom: 15,
      zoomControl: false,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

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
  }, []);

  return (
    <>
      <div ref={mapElement} style={{ height: "100%" }} />
    </>
  );
}

export default NaverMap;
