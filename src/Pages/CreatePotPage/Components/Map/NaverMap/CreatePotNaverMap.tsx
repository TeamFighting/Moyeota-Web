import { useEffect, useRef, useState } from 'react';
import LatLngAddStore from '../../../../../state/store/LatLngAddstore';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        naver: any;
    }
}

interface NaverMapProps {
    destination: string | undefined;
}
function CreatePotNaverMap({ destination }: NaverMapProps) {
    const mapElement = useRef(null);
    const { naver } = window;
    const { currentLat, currentLng } = LatLngAddStore((state) => state);
    const [changeCenter, setChangeCenter] = useState({ lat: currentLat, lng: currentLng });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [bounds, setBounds] = useState<any>(null);
    const mapOptions = {
        zoomControl: false,
        minZoom: 0,
        maxZoom: 100,
        center: new naver.maps.LatLng(changeCenter.lat, changeCenter.lng),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any = null;

    function placeSearch(destination: string) {
        const ps = new kakao.maps.services.Places();
        if (!destination.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }
        ps.keywordSearch(destination, placesSearchCB);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function placesSearchCB(data: any, status: any) {
        if (status === kakao.maps.services.Status.OK) {
            console.log(data);
            const boundsArr = [];
            for (let i = 0; i < data.length; i++) {
                boundsArr.push(new naver.maps.LatLng(data[i].y, data[i].x));
            }
            if (bounds == null) {
                setChangeCenter({ lat: data[0].y, lng: data[0].x });

                setBounds(new naver.maps.LatLngBounds(boundsArr));
            }
            // console.log(bounds);

            displayPlaces(data);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const markers: any = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function displayPlaces(places: any) {
        for (let key = 0; key < places.length; key++) {
            const position = new naver.maps.LatLng(places[key].y, places[key].x);
            // console.log(places[key]);
            const marker = new naver.maps.Marker({
                position: position,
                map: map,
                icon: {
                    url: '/svg/GreenLocationMarker.svg',
                    size: new naver.maps.Size(50, 52),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(25, 26),
                    title: places[key].place_name,
                },
            });
            markers.push(marker);
        }
    }
    useEffect(() => {
        if (!mapElement.current || !naver) return;
        if (mapElement.current) {
            map = new naver.maps.Map(mapElement.current, mapOptions);
        }
        if (destination) {
            placeSearch(destination);
        }
    }, [destination, bounds]);

    return (
        <>
            <div ref={mapElement} style={{ height: '100%' }} />
        </>
    );
}

export default CreatePotNaverMap;
