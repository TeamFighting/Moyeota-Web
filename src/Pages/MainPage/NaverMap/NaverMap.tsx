/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from 'react';
import ContentStore from '../../../state/store/ContentStore';
import { useQuickPotStore } from '../../../state/store/QuickPotStore';
import { useClickedMarker } from '../../../state/store/ClickedMarker';
import LatLngAddStore from '../../../state/store/LatLngAddstore';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any;
  }
}

interface ArrayElement {
  latitude: number;
  longitude: number;
  postId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function NaverMap({ from }: { from: string }) {
  const mapElement = useRef(null);

  const { naver } = window;
  const { currentLat, currentLng } = LatLngAddStore((state) => state);

  const latitude = currentLat;

  const longitude = currentLng;

  const { totalData } = ContentStore();

  const { quickPot } = useQuickPotStore();
  const { setClickedMarker } = useClickedMarker();
  const departures = useMemo(
    () =>
      totalData.map((data) => ({
        departure: data.departure,
        postId: data.postId,
        latitude: data.latitude,
        longitude: data.longitude,
      })),
    [totalData],
  );
  const [finalArray, setFinalArray] = useState<ArrayElement[]>([]);

  useEffect(() => {
    if (quickPot.length !== 0) {
      setFinalArray(quickPot);
    } else {
      setFinalArray(departures);
    }
  }, [departures, quickPot]);

  // console.log(finalArray);
  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(latitude, longitude);

    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: false,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    const markers: any = [];

    for (const key in finalArray) {
      const position = new naver.maps.LatLng(finalArray[key].latitude, finalArray[key].longitude);

      const marker = new naver.maps.Marker({
        position: position,
        map: map,
        icon: {
          url: '/svg/GreenLocationMarker.svg',
          size: new naver.maps.Size(50, 52),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 26),
          // title: finalArray[key].data.place_name,
        },
        postId: finalArray[key].postId,
      });

      markers.push(marker);
    }

    function getClickHandler(seq: any) {
      return function () {
        const marker = markers[seq];
        setClickedMarker(marker.postId);
      };
    }

    // 클릭 이벤트
    for (let i = 0, ii = markers.length; i < ii; i++) {
      naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
    }

    if (from !== 'quickMatch') {
      // 현위치 마커
      new naver.maps.Marker({
        position: location,
        map,
        icon: {
          url: '/svg/CurrentLocationIcon.svg',
          size: new naver.maps.Size(50, 52),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 26),
        },
      });
    }
  }, [finalArray, latitude, longitude, naver, setClickedMarker]);

  return (
    <>
      <div ref={mapElement} style={{ zIndex: '-1', height: '100%' }} />
    </>
  );
}

export default NaverMap;
