import LatLngStore from '../../../zustand/store/LatLngstore';
import { distance } from '../../util/calc';

function watchPositionHook() {
    const { currentLat, currentLng } = LatLngStore((state) => state);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function success(pos: any) {
        const crd = pos.coords;
        console.log(crd.latitude, crd.longitude);
        const d = distance(currentLat, currentLng, crd.latitude, crd.longitude);
        if (d > 0.01) {
            console.log('위치가 변경되었습니다.');
            localStorage.setItem('latitude', crd.latitude.toString());
            localStorage.setItem('longitude', crd.longitude.toString());
            LatLngStore.setState({
                currentLat: crd.latitude,
                currentLng: crd.longitude,
            });
        }
    }

    function error(err: { code: number; message: string }) {
        console.log('ERROR(' + err.code + '): ' + err.message);
    }

    const options: PositionOptions | undefined = {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: Infinity,
    };

    navigator.geolocation.watchPosition(success, error, options);
}

export default watchPositionHook;
