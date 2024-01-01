import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CurrentLocationStore from '../../zustand/store/CurrentLocation';
declare global {
    interface Window {
        kakao: {
            maps: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                LatLng: any;
                services: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    Geocoder: any;
                };
            };
        };
    }
}

function LocationHeader() {
    const latitude = Number(localStorage.getItem('latitude'));
    const longitude = Number(localStorage.getItem('longitude'));

    const [location, setLocation] = useState<string>('');
    const { setCurrentLocation } = CurrentLocationStore();

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
            setLocation(location);
            setCurrentLocation(result[0].address);
            localStorage.setItem('address', result[0].address.address_name);
        }
    };

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2Address(longitude, latitude, callback);
        }
    }, [latitude, longitude]);

    return <Location>{location}</Location>;
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
