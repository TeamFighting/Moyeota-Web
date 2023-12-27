function watchPositionHook() {
    let id = 0

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function success(pos: any) {
        const crd = pos.coords
        console.log('Your current position is:', crd.latitude, crd.longitude)
        if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
            console.log('Congratulations, you reached the target')
            navigator.geolocation.clearWatch(id)
        }
    }

    function error(err: { code: number; message: string }) {
        console.warn('ERROR(' + err.code + '): ' + err.message)
    }

    const target: { latitude: number; longitude: number } = {
        latitude: 0,
        longitude: 0,
    }

    const options: PositionOptions | undefined = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
    }

    id = navigator.geolocation.watchPosition(success, error, options)
}

export default watchPositionHook
