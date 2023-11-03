import { useEffect, useRef } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any;
  }
}

interface NaverMapProps {
  destination: string | undefined;
}

function NaverMap({ destination }: NaverMapProps) {
  const mapElement = useRef(null);
  const { naver } = window;

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    if (destination) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const location = new naver.maps.LatLng(latitude, longitude);

          const mapOptions = {
            center: location,
            zoom: 15,
            zoomControl: false,
          };

          const map = new naver.maps.Map(mapElement.current, mapOptions);

          naver.maps.Service.geocode(
            { address: destination },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            function (status: any, response: any) {
              if (status === naver.maps.Service.Status.ERROR) {
                return alert("주소 변환 오류");
              }
              if (response.v2 && response.v2.addresses.length > 0) {
                const new_position = new naver.maps.LatLng(
                  response.v2.addresses[0].y,
                  response.v2.addresses[0].x
                );

                map.setCenter(new_position);

                new naver.maps.Marker({
                  position: new_position,
                  map: map,
                  icon: {
                    url: "../../../public/svg/DestinationLocationIcon.svg",
                    size: new naver.maps.Size(50, 52),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(25, 26),
                  },
                });
              } else {
                alert("주소 변환 실패");
              }
            }
          );
        });
      } else {
        console.log("실패");
      }
    } else {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const location = new naver.maps.LatLng(latitude, longitude);

          const mapOptions = {
            center: location,
            zoom: 15,
            zoomControl: false,
          };

          const map = new naver.maps.Map(mapElement.current, mapOptions);

          new naver.maps.Marker({
            position: location,
            map: map,
            icon: {
              url: "../../../public/svg/CurrentLocationIcon.svg",
              size: new naver.maps.Size(50, 52),
              origin: new naver.maps.Point(0, 0),
              anchor: new naver.maps.Point(25, 26),
            },
          });
        });
      } else {
        console.log("실패");
      }
    }
  }, [destination]);

  return (
    <>
      <div ref={mapElement} style={{ height: "100%" }} />
    </>
  );
}

export default NaverMap;
