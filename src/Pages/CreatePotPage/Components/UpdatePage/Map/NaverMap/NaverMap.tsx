import { useEffect, useRef } from 'react'
import axios from 'axios'

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        naver: any
    }
}

interface NaverMapProps {
    destination: string | undefined
}

function NaverMap({ destination }: NaverMapProps) {
    const mapElement = useRef(null)
    const { naver } = window

    useEffect(() => {
        if (!mapElement.current || !naver) return

        if (destination) {
            axios
                .get(`https://moyeota.shop/api/distance/keyword`, {
                    params: { query: destination },
                })
                .then((response) => {
                    const data = response.data
                    const latitude = data.data.y
                    const longitude = data.data.x
                    const location = new naver.maps.LatLng(latitude, longitude)

                    const mapOptions = {
                        center: location,
                        zoom: 15,
                        zoomControl: false,
                    }

                    const map = new naver.maps.Map(mapElement.current, mapOptions)

                    new naver.maps.Marker({
                        position: location,
                        map: map,
                        icon: {
                            url: '../../../public/svg/DestinationLocationIcon.svg',
                            size: new naver.maps.Size(41, 58),
                            origin: new naver.maps.Point(0, 0),
                            anchor: new naver.maps.Point(25, 26),
                        },
                    })
                })
                .catch(() => {
                    alert('주소를 바르게 입력하세요')
                })
        } else if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                const location = new naver.maps.LatLng(latitude, longitude)

                const mapOptions = {
                    center: location,
                    zoom: 15,
                    zoomControl: false,
                }

                const map = new naver.maps.Map(mapElement.current, mapOptions)

                new naver.maps.Marker({
                    position: location,
                    map: map,
                    icon: {
                        url: '../../../public/svg/CurrentLocationIcon.svg',
                        size: new naver.maps.Size(50, 52),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(25, 26),
                    },
                })
            })
        } else {
            console.log('실패')
        }
    }, [destination])

    return (
        <>
            <div ref={mapElement} style={{ height: '100%' }} />
        </>
    )
}

export default NaverMap
