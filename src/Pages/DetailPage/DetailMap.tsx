/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from 'react';
import { instance } from '../../axios';

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
    status: number;
    postId: string;
}

interface MapProps {
    departure: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function DetailMap({ departure }: MapProps) {
    const mapElement = useRef(null);
    const { naver } = window;

    useEffect(() => {
        if (!mapElement.current || !naver) return;
        const fetchDeparture = async () => {
            try {
                const res = await instance.get(`/distance/keyword`, {
                    params: { query: `${departure}` },
                });
                const location = new naver.maps.LatLng(res.data.data.y, res.data.data.x);
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
                        url: '/public/svg/CurrentLocationIcon.svg',
                        size: new naver.maps.Size(50, 52),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(25, 26),
                    },
                });
            } catch (e) {
                console.log(e);
            }
        };
        fetchDeparture();
    }, []);

    return (
        <>
            <div ref={mapElement} style={{ height: '100%' }} />
        </>
    );
}

export default DetailMap;
