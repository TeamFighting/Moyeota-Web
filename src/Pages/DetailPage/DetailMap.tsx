/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { instance } from '../../axios';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        naver: any;
    }
}

interface MapProps {
    keyWordDeparture?: string;
    infoDeparture?: string;
}

interface ResultProps {
    x?: number;
    y?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function DetailMap({ keyWordDeparture, infoDeparture }: MapProps) {
    console.log(infoDeparture, keyWordDeparture);
    const mapElement = useRef(null);
    const { naver } = window;
    const [result, setResult] = useState<ResultProps>({});
    useEffect(() => {
        if (!mapElement.current || !naver) return;

        const fetchDeparture = async () => {
            try {
                if (infoDeparture !== undefined && keyWordDeparture === undefined) {
                    const res = await instance.get(`/distance/info`, {
                        params: { address: `${infoDeparture}` },
                    });
                    setResult(res.data.data);
                } else if (keyWordDeparture !== undefined && infoDeparture === undefined) {
                    const res = await instance.get(`/distance/keyword`, {
                        params: { query: `${keyWordDeparture}` },
                    });
                    setResult(res.data.data);
                }

                const location = new naver.maps.LatLng(result.y, result.x);
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
    }, [infoDeparture, keyWordDeparture, naver, result.x, result.y]);

    return (
        <>
            <div ref={mapElement} style={{ height: '100%' }} />
        </>
    );
}

export default DetailMap;
