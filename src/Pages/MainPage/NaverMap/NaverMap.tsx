/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import ContentStore from "../../../zustand/store/ContentStore";
import axios from "axios";
import { useQuickPotStore } from "../../../zustand/store/QuickPotStore";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any;
  }
}

interface ArrayElement {
  data: {
    x: number;
    y: number;
    place_name: string;
    road_address_name: string;
  };
  status: number;
  postId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function NaverMap() {
  const mapElement = useRef(null);

  const { naver } = window;

  const latitude = Number(localStorage.getItem("latitude"));

  const longitude = Number(localStorage.getItem("longitude"));

  const { totalData } = ContentStore();

  const { quickPot } = useQuickPotStore();

  const departures = useMemo(
    () =>
      totalData.map((data) => ({
        departure: data.departure,
        postId: data.postId,
      })),
    [totalData]
  );

  const [finalArray, setFinalArray] = useState<ArrayElement[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      if (quickPot.length !== 0) {
        const promises = quickPot.map((data) => {
          axios
            .get(`http://moyeota.shop/api/distance/keyword`, {
              params: { query: `${data.departure}` },
            })
            .then((res) => {
              setFinalArray((prev) => [...prev, res.data]);
            });
        });
        const results = await Promise.all(promises);
      } else {
        const promises = departures.map((data) =>
          axios.get(`http://moyeota.shop/api/distance/keyword`, {
            params: { query: `${data.departure}` },
          })
        );

        const results = await Promise.all(promises);

        const finalData = results.map((result) => ({
          data: result.data.data,
          status: result.status,
          postId: departures[results.indexOf(result)].postId,
        }));
        setFinalArray(finalData);
      }
    };
    fetchDestinations();
  }, [departures, quickPot]);

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(latitude, longitude);

    const mapOptions = {
      center: location,
      zoom: 13,
      zoomControl: false,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    const markers: any = [];
    const infoWindows: any[] = [];

    for (const key in finalArray) {
      const position = new naver.maps.LatLng(
        finalArray[key].data.y,
        finalArray[key].data.x
      );

      const marker = new naver.maps.Marker({
        position: position,
        map: map,
        icon: {
          url: "../../../public/svg/GreenLocationMarker.svg",
          size: new naver.maps.Size(50, 52),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 26),
          title: finalArray[key].data.place_name,
        },
      });

      const infoWindow = new naver.maps.InfoWindow({
        content:
          '<div style="width:150px;text-align:center;padding:10px;">The Letter is <b>"' +
          "helloworld" +
          '"</b>.</div>',
      });
      markers.push(marker);
      infoWindows.push(infoWindow);
    }

    function getClickHandler(seq: any) {
      return function (e: any) {
        console.log("click", e);
        const marker = markers[seq],
          infoWindow = infoWindows[seq];

        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      };
    }

    for (let i = 0, ii = markers.length; i < ii; i++) {
      naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
    }
  }, [finalArray]);

  return (
    <>
      <div ref={mapElement} style={{ height: "100%" }} />
    </>
  );
}

export default NaverMap;
