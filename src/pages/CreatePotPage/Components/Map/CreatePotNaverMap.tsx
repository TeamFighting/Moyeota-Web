import { useEffect, useRef, useState } from 'react';
import LatLngAddStore from '@stores/LatLngAddstore';
import DestinationStore from '@stores/DestinationResult';
import { DestinationMarkerClickStore } from '@stores/DestinationMarkerClickStore';
import PotCreateStore from '@stores/PotCreateStore';

declare global {
    interface Window {
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
    const { setDestination } = PotCreateStore();
    const { destinationResult, setDestinationResult } = DestinationStore((state) => state);
    const { setClickedDestinationMarker, clickedDestinationMarker } = DestinationMarkerClickStore((state) => state);
    const [changeCenter, setChangeCenter] = useState({ lat: currentLat, lng: currentLng, title: '' });
    const [bounds, setBounds] = useState<any>(null);
    const mapOptions = {
        zoomControl: false,
        minZoom: 0,
        maxZoom: 100,
        center: new naver.maps.LatLng(changeCenter.lat, changeCenter.lng),
    };

    let map: any = null;

    const placeSearch = (destination: string) => {
        const ps = new kakao.maps.services.Places();
        if (!destination.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }
        ps.keywordSearch(destination, placesSearchCB);
    };
    const placesSearchCB = (data: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
            const boundsArr = [];
            for (let i = 0; i < data.length; i++) {
                boundsArr.push(new naver.maps.LatLng(data[i].y, data[i].x));
            }
            setDestinationResult(data[0]);
            if (bounds == null) {
                setBounds(new naver.maps.LatLngBounds(boundsArr));
            }

            displayPlaces(data);
            const getClickHandler = (seq: any) => {
                return function () {
                    setClickedDestinationMarker(seq.icon);
                };
            };
            for (let i = 0, ii = markers.length; i < ii; i++) {
                naver.maps.Event.addListener(markers[i], 'click', getClickHandler(markers[i]));
            }
        }
    };

    const markers: any = [];

    const displayPlaces = (places: any) => {
        for (let key = 0; key < places.length; key++) {
            const position = new naver.maps.LatLng(places[key].y, places[key].x);
            let selectedMarkerSize = new naver.maps.Size(30, 36);
            let selectedMarkerUrl = '/svg/NotSelectedDestinationMarker.svg';
            if (clickedDestinationMarker !== null && clickedDestinationMarker.title == places[key].place_name) {
                selectedMarkerSize = new naver.maps.Size(50, 52);
                selectedMarkerUrl = '/svg/DestinationMarker.svg';
            } else if (
                clickedDestinationMarker == null &&
                changeCenter.title == places[key].place_name &&
                changeCenter.lat == places[key].y &&
                changeCenter.lng == places[key].x
            ) {
                setDestinationResult(places[key].icon);
                selectedMarkerSize = new naver.maps.Size(50, 52);
                selectedMarkerUrl = '/svg/DestinationMarker.svg';
            }

            const marker = new naver.maps.Marker({
                position: position,
                map: map,
                icon: {
                    index: key,
                    url: selectedMarkerUrl,
                    size: new naver.maps.Size(50, 52),
                    scaledSize: selectedMarkerSize,
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(25, 26),
                    title: places[key].place_name,
                    position: {
                        lat: places[key].y,
                        lng: places[key].x,
                    },
                },
            });
            markers.push(marker);
        }
    };

    useEffect(() => {
        if (!mapElement.current || !naver) return;
        if (mapElement.current) {
            map = new naver.maps.Map(mapElement.current, mapOptions);
        }
        if (destination) {
            placeSearch(destination);
        }
    }, [destination, bounds, clickedDestinationMarker]);

    useEffect(() => {
        if (!destinationResult) return;
        setDestination(destinationResult.place_name);

        console.log('destinationResult:', destinationResult);
        setChangeCenter({
            lat: parseFloat(destinationResult.y),
            lng: parseFloat(destinationResult.x),
            title: destinationResult.place_name,
        });
    }, [destinationResult]);
    return (
        <>
            <div ref={mapElement} style={{ height: '100%' }} />
        </>
    );
}

export default CreatePotNaverMap;
