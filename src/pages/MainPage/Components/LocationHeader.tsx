import LatLngAddStore from '@stores/LatLngAddstore';
import { useEffect } from 'react';
import styled from 'styled-components';

import CurrentLocationStore from '@stores/CurrentLocation';
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

function LocationHeader() {
    const { currentLat, currentLng } = LatLngAddStore();
    const { currentLocation, setCurrentLocation } = CurrentLocationStore();
    const callback = function (
        result: {
            address: {
                address_name: string;
                region_1depth_name: string;
                region_2depth_name: string;
            };
            road_address: {
                region_1depth_name: string;
                region_2depth_name: string;
                building_name: string;
            } | null;
        }[],
        status: kakao.maps.services.Status,
    ) {
        if (status === kakao.maps.services.Status.OK) {
            const location = result[0].address?.region_1depth_name + ' ' + result[0].address?.region_2depth_name;
            setCurrentLocation({
                address_name: result[0].address.address_name,
                region_1depth_name: result[0].address.region_1depth_name,
                region_2depth_name: result[0].address.region_2depth_name,
                locationTitle: location,
            });
            sessionStorage.setItem('address', result[0].address.address_name);
        }
    };

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2Address(currentLng, currentLat, callback);
        }
    }, [currentLat, currentLng]);

    return <Location>{currentLocation?.locationTitle}</Location>;
}

const Location = styled.div`
    font-size: 18px;
    font-weight: 700;
    margin-left: 14px;
    white-space: nowrap;
    height: 64px;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export default LocationHeader;
