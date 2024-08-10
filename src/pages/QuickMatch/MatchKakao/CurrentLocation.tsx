import { useState } from 'react';
import useStore from '../../../stores/LatLngAddstore';

function CurrentLocation() {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | string>({
        latitude: 33.4925551,
        longitude: 126.4876332,
    });

    const { setLatLngAdd } = useStore((state) => state);

    // useEffect(() => {
    // const intervalId = setInterval(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    // }, 500000);

    function success(position: GeolocationPosition) {
        setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });

        setLatLngAdd(position.coords.latitude, position.coords.longitude);
    }

    function error() {
        setLocation({
            latitude: 37.483034,
            longitude: 126.902435,
        });
        alert('위치받기 실패');
    }
    // return () => clearInterval(intervalId);
    // }, [location, setLatLngAdd]);

    return location;
}

export default CurrentLocation;
