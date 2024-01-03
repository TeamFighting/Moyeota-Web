import useStore from '../zustand/store/LatLngAddstore';

function useCurrentLocation() {
    const { setLatLngAdd } = useStore((state) => state);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position: GeolocationPosition) {
        console.log(position.coords.latitude, position.coords.longitude);
        localStorage.setItem('latitude', position.coords.latitude.toString());
        localStorage.setItem('longitude', position.coords.longitude.toString());
        setLatLngAdd(position.coords.latitude, position.coords.longitude, localStorage.getItem('address') as string);
    }
    function error() {
        console.log('위치받기 실패');
    }
}

export default useCurrentLocation;
