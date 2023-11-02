import { useEffect, useRef } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function MatchNaverMap() {
  const mapElement = useRef(null);
  const { naver } = window;
  const latitude = Number(localStorage.getItem("latitude"));
  const longitude = Number(localStorage.getItem("longitude"));

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(latitude, longitude);
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

export default MatchNaverMap;
