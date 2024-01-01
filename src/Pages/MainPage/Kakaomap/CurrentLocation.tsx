import { useState } from 'react';
import useStore from '../../../zustand/store/LatLngAddstore';

function useCurrentLocation() {
    const { setLatLngAdd } = useStore((state) => state);
    const [, setLocation] = useState<{ latitude: number; longitude: number; address: string } | string>({
        latitude: 37.6486216,
        longitude: 127.077779,
        address: '',
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position: GeolocationPosition) {
        const geocoder = new window.kakao.maps.services.Geocoder();

        localStorage.setItem('latitude', position.coords.latitude.toString());
        localStorage.setItem('longitude', position.coords.longitude.toString());
        setLocation({
            latitude: localStorage.getItem('latitude') as unknown as number,
            longitude: localStorage.getItem('longitude') as unknown as number,
            address: localStorage.getItem('address') as string,
        });
        setLatLngAdd(
            localStorage.getItem('latitude') as unknown as number,
            localStorage.getItem('longitude') as unknown as number,
            localStorage.getItem('address') as string,
        );

        geocoder.coord2Address(
            position.coords.latitude,
            position.coords.longitude,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (result: any, status: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const address = result[0].address.address_name;
                    localStorage.setItem('address', address);
                }
            },
        );
    }

    function error() {
        setLocation({
            latitude: 37.483034,
            longitude: 126.902435,
            address: '',
        });
        console.log('위치받기 실패');
    }
}

export default useCurrentLocation;
