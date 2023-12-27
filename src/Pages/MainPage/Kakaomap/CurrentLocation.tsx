import { useState } from 'react'
import useStore from '../../../zustand/store/LatLngstore'

function useCurrentLocation() {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | string>({
        latitude: 33.4925551,
        longitude: 126.4876332,
    })

    const { setLatLng } = useStore((state) => state)

    const intervalId = setInterval(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error)
        }
    }, 50000)

    function success(position: GeolocationPosition) {
        console.log('위치받기 성공')
        console.log([position.coords.latitude, position.coords.longitude])
        localStorage.setItem('latitude', position.coords.latitude.toString())
        localStorage.setItem('longitude', position.coords.longitude.toString())
        setLocation({
            latitude: localStorage.getItem('latitude') as unknown as number,
            longitude: localStorage.getItem('longitude') as unknown as number,
        })
        setLatLng(
            localStorage.getItem('latitude') as unknown as number,
            localStorage.getItem('longitude') as unknown as number,
        )
    }

    function error() {
        setLocation({
            latitude: 37.483034,
            longitude: 126.902435,
        })
        console.log('위치받기 실패')
    }
    return () => clearInterval(intervalId)
}

export default useCurrentLocation
