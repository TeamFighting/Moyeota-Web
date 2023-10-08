/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useEffect, useState } from 'react';
import CurrentLocation from './CurrentLocation';
// import SlideModal from '../SlideModal/SlideModal';

declare global {
  interface Window {
    kakao: any;
  }
}

function Kakaomap({ mapRef }: { mapRef: MutableRefObject<any> }) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const location = CurrentLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initMap = () => {
    if (typeof location != 'string') {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(location.latitude, location.longitude),
        level: 3,
      };

      const imgsrc = '../../../public/svg/CurrentLocationIcon.svg';

      const imageSize = new kakao.maps.Size(45, 45);
      const imageOption = { offset: new kakao.maps.Point(27, 69) };
      const markerImage = new kakao.maps.MarkerImage(
        imgsrc,
        imageSize,
        imageOption
      );

      const map = new kakao.maps.Map(container as HTMLElement, options);

      const markerPosition = new kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        clickable: true,
        image: markerImage,
      });

      marker.setMap(map);
      console.log(isModalOpen);
      (mapRef as MutableRefObject<any>).current = map;
      kakao.maps.event.addListener(marker, 'click', function () {
        console.log('click');
        setIsModalOpen(!isModalOpen);
        console.log(isModalOpen);
      });
    }
  };

  // const geocoder = new kakao.maps.services.Geocoder();
  // const callback = (result: any, status: any) => {
  //   if (status === kakao.maps.services.Status.OK) {
  //     console.log(result);
  //   }
  // };
  // console.log(geocoder.addressSearch('서울특별시 노원구 공릉로 232', callback));

  useEffect(() => {
    kakao.maps.load(() => initMap());
  }, [mapRef, location, initMap]);

  return (
    <>
      <div
        id="map"
        style={{ position: 'relative', width: '100%', height: '100%' }}
      ></div>
    </>
  );
}

export default Kakaomap;
