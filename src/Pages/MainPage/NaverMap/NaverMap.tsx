/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from 'react'
import ContentStore from '../../../zustand/store/ContentStore'
import axios from 'axios'
import { useQuickPotStore } from '../../../zustand/store/QuickPotStore'
import { useClickedMarker } from '../../../zustand/store/ClickedMarker'

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        naver: any
    }
}

interface ArrayElement {
    data: {
        x: number
        y: number
        place_name: string
        road_address_name: string
    }
    status: number
    postId: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function NaverMap() {
    const mapElement = useRef(null)

    const { naver } = window

    const latitude = Number(localStorage.getItem('latitude'))

    const longitude = Number(localStorage.getItem('longitude'))

    const { totalData } = ContentStore()

    const { quickPot } = useQuickPotStore()

    const { setClickedMarker } = useClickedMarker()

    const departures = useMemo(
        () =>
            totalData.map((data) => ({
                departure: data.departure,
                postId: data.postId,
            })),
        [totalData],
    )

    const [finalArray, setFinalArray] = useState<ArrayElement[]>([])

    useEffect(() => {
        const fetchDestinations = async () => {
            if (quickPot.length !== 0) {
                try {
                    const promises = quickPot.map((data) => {
                        axios
                            .get(`http://moyeota.shop/api/distance/keyword`, {
                                params: { query: `${data.departure}` },
                            })
                            .then((res) => {
                                setFinalArray((prev) => [
                                    ...prev,
                                    {
                                        data: res.data.data,
                                        status: res.status,
                                        postId: data.postId,
                                    },
                                ])
                            })
                    })
                    await Promise.all(promises)
                } catch (e) {
                    console.log(e)
                }
            } else {
                try {
                    const promises = departures.map((data) =>
                        axios.get(`http://moyeota.shop/api/distance/keyword`, {
                            params: { query: `${data.departure}` },
                        }),
                    )

                    const results = await Promise.all(promises)

                    const finalData = results.map((result) => ({
                        data: result.data.data,
                        status: result.status,
                        postId: departures[results.indexOf(result)].postId,
                    }))
                    setFinalArray(finalData)
                } catch (e) {
                    console.log(e)
                }
            }
        }
        fetchDestinations()
    }, [departures, quickPot])

    useEffect(() => {
        if (!mapElement.current || !naver) return

        const location = new naver.maps.LatLng(latitude, longitude)

        const mapOptions = {
            center: location,
            zoom: 13,
            zoomControl: false,
        }

        const map = new naver.maps.Map(mapElement.current, mapOptions)

        const markers: any = []

        for (const key in finalArray) {
            const position = new naver.maps.LatLng(finalArray[key].data.y, finalArray[key].data.x)

            const marker = new naver.maps.Marker({
                position: position,
                map: map,
                icon: {
                    url: '../../../public/svg/GreenLocationMarker.svg',
                    size: new naver.maps.Size(50, 52),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(25, 26),
                    title: finalArray[key].data.place_name,
                },
                postId: finalArray[key].postId,
            })

            markers.push(marker)
        }

        function getClickHandler(seq: any) {
            return function () {
                const marker = markers[seq]
                setClickedMarker(marker.postId)
            }
        }

        // 클릭 이벤트
        for (let i = 0, ii = markers.length; i < ii; i++) {
            naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i))
        }

        // 현위치 마커
        new naver.maps.Marker({
            position: location,
            map,
            icon: {
                url: '../../../public/svg/CurrentLocationIcon.svg',
                size: new naver.maps.Size(50, 52),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(25, 26),
            },
        })
    }, [finalArray])

    return (
        <>
            <div ref={mapElement} style={{ height: '100%' }} />
        </>
    )
}

export default NaverMap
