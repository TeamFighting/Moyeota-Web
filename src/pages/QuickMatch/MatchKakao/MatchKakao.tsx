/* global kakao */
 
import type { MutableRefObject} from 'react';
import { useEffect, useState } from 'react';

import CurrentLocation from './CurrentLocation';
// import SlideModal from '../SlideModal/SlideModal';
declare global {
    interface Window {
        kakao: {
            maps: {
                 
                LatLng: any;
                services: {
                     
                    Geocoder: any;
                };
            };
        };
    }
}

function MatchKaKao({ mapRef }: { mapRef: MutableRefObject<any> }) {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const location = CurrentLocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initMap = () => {
        if (typeof location != 'string') {
            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(location.latitude, location.longitude),
                level: 5,
            };

            const imgsrc = '/svg/CurrentLocationIcon.svg';

            const imageSize = new kakao.maps.Size(45, 45);
            const imageOption = { offset: new kakao.maps.Point(27, 69) };
            const markerImage = new kakao.maps.MarkerImage(imgsrc, imageSize, imageOption);

            const map = new kakao.maps.Map(container as HTMLElement, options);

            const markerPosition = new kakao.maps.LatLng(location.latitude, location.longitude);

            const marker = new kakao.maps.Marker({
                position: markerPosition,
                clickable: true,
                image: markerImage,
            });

            marker.setMap(map);
            (mapRef as MutableRefObject<any>).current = map;
            kakao.maps.event.addListener(marker, 'click', function () {
                setIsModalOpen(!isModalOpen);
            });
        }
    };

    useEffect(() => {
        kakao.maps.load(() => initMap());
    }, [mapRef, location, initMap]);

    return (
        <>
            <div id="map" style={{ position: 'relative', width: '100vw', height: '50vh' }}></div>
        </>
    );
}

export default MatchKaKao;
