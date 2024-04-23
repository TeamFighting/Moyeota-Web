import useStore from '../state/store/LatLngAddstore';

function useCurrentLocation() {
    const { setLatLngAdd } = useStore((state) => state);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position: GeolocationPosition) {
        console.log('useLocation 위치받기 성공');
        sessionStorage.setItem('latitude', position.coords.latitude.toString());
        sessionStorage.setItem('longitude', position.coords.longitude.toString());
        setLatLngAdd(position.coords.latitude, position.coords.longitude, localStorage.getItem('address') as string);
    }
    function error() {
        alert('위치받기 실패');
    }
}

export default useCurrentLocation;
