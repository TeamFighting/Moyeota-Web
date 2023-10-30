import { useEffect, useRef } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any;
  }
}

function NaverMap() {
  const mapElement = useRef(null);
  const { naver } = window;

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const location = new naver.maps.LatLng(latitude, longitude);

        const mapOptions = {
          center: location,
          zoom: 17,
          zoomControl: false,
        };

        const map = new naver.maps.Map(mapElement.current, mapOptions);
        new naver.maps.Marker({
          position: location,
          map,
        });
      });
    } else {
      console.log("실패");
    }
  }, []);

  return (
    <>
      <div ref={mapElement} style={{ height: "100%" }} />
    </>
  );
}

export default NaverMap;
