/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        naver: any;
    }
}

interface Props {
    curLat: string;
    curLng: string;
}

function DetailMap({ curLat, curLng }: Props) {
    const mapElement = useRef(null);
    const { naver } = window;
    if (curLat == null || curLng == null || curLat == '' || curLng == '' || curLat == 'string' || curLng == 'string') {
        curLat = '37.4979';
        curLng = '127.0276';
    }
    useEffect(() => {
        if (!mapElement.current || !naver) return;

        const fetchDeparture = async () => {
            try {
                const location = new naver.maps.LatLng(parseFloat(curLat), parseFloat(curLng));
                const mapOptions = {
                    center: location,
                    zoom: 13,
                    zoomControl: false,
                };
                const map = new naver.maps.Map(mapElement.current, mapOptions);

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
            } catch (e) {
                alert(e);
            }
        };
        fetchDeparture();
    }, [naver, curLat, curLng]);

    return (
        <>
            <div ref={mapElement} style={{ height: '100%' }} />
        </>
    );
}

export default DetailMap;
