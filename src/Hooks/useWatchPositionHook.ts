import LatLngAddstore from '../stores/LatLngAddstore';
// import { distance } from '../Pages/util/calc';

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
    // const { currentLat, currentLng } = LatLngAddstore((state) => state);

    async function success(pos: PositionOptions) {
        // let d = 0;
        // if (currentLat !== 37.6294657 && currentLng !== 127.0807685) {
        //     d = distance(currentLat, currentLng, pos.coords.latitude, pos.coords.longitude);
        // }

        sessionStorage.setItem('latitude', pos.coords.latitude.toString());
        sessionStorage.setItem('longitude', pos.coords.longitude.toString());
        LatLngAddstore.setState({
            currentLat: pos.coords.latitude,
            currentLng: pos.coords.longitude,
        });
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
