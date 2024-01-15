import LatLngAddstore from '../state/store/LatLngAddstore';
import { distance } from '../Pages/util/calc';

interface PositionOptions {
    coords: {
        latitude: number;
        longitude: number;
    };
}

interface Options {
    enableHighAccuracy: boolean;
    timeout: number;
    maximumAge: number;
}

function watchPositionHook() {
    const { currentLat, currentLng } = LatLngAddstore((state) => state);

    async function success(pos: PositionOptions) {
        const d = distance(currentLat, currentLng, pos.coords.latitude, pos.coords.longitude);
        if (d > 0.1) {
            localStorage.setItem('latitude', pos.coords.latitude.toString());
            localStorage.setItem('longitude', pos.coords.longitude.toString());
            LatLngAddstore.setState({
                currentLat: pos.coords.latitude,
                currentLng: pos.coords.longitude,
            });
        }
    }

    function error(err: { code: number; message: string }) {
        alert('ERROR(' + err.code + '): ' + err.message);
    }

    const options: Options | undefined = {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 0,
    };
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(success, error, options);
    } else {
        alert('위치정보 사용 불가능');
    }
}

export default watchPositionHook;
