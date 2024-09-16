/* eslint-disable @typescript-eslint/no-explicit-any */

import LatLngAddStore from '@stores/LatLngAddstore';
import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any

        naver: any;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any

function ReimburseMap() {
    const mapElement = useRef(null);

    const { naver } = window;

    const { currentLat, currentLng } = LatLngAddStore((state) => state);

    const latitude = currentLat;

    const longitude = currentLng;

    useEffect(() => {
        if (!mapElement.current || !naver) return;

        const location = new naver.maps.LatLng(latitude, longitude);

        const mapOptions = {
            center: location,
            zoom: 13,
            zoomControl: false,
        };

        const map = new naver.maps.Map(mapElement.current, mapOptions);

        // 현위치 마커

        new naver.maps.Marker({
            position: location,

            map,

            icon: {
                url: '/svg/CurrentLocationIcon.svg',

                size: new naver.maps.Size(45, 45),

                origin: new naver.maps.Point(0, 0),

                anchor: new naver.maps.Point(0, 0),
            },
        });
    }, [latitude, longitude, naver]);

    return (
        <>
            <div ref={mapElement} style={{ height: '100%', width: '100%' }} />
        </>
    );
}

export default ReimburseMap;
