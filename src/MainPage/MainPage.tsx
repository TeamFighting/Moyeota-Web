import styled from 'styled-components';
import Kakaomap from './Kakaomap/Kakaomap';
import Chevronleft from '../../public/svg/Chevronleft.svg';
import { useEffect, useRef } from 'react';
import BottomSheet from './BottomSheet/Components/BottomSheet';
import LocationHeader from './BottomSheet/Components/LocationHeader';
import { HEADER_HEIGHT } from '../Constants/constant';
import axios from "axios";
import useStore from '../zustand/store/ContentStore';

// import NaverMap from './NaverMap/NaverMap';

function MainPage() {
  const mapRef = useRef<HTMLElement | null>(null);
  const {updateTotalData} = useStore((state) => state);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    fetchData();
}, []);


  async function fetchData() {
    try {
        const res = await axios.get('http://moyeota.shop/api/posts?page=0');
        if(res.status === 200) {
            console.log("전체", res.data.data.content);
            updateTotalData(res.data.data.content);
        }
        else {
          alert(res.status + "에러");
        }
    } catch (e) {
      alert("서버와의 통신에 실패했습니다.");
        console.log(e);
    }
}
  
  return (
    <Container>
      <Header>
        <Chevronleft />
        <LocationHeader />
      </Header>
      <Body>
        <Kakaomap mapRef={mapRef} />
        <Bottom>
          <BottomSheet  />
        </Bottom>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Header = styled.div`
  height: ${HEADER_HEIGHT}px;
  position: sticky;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 4%;
  z-index: 1000000;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 258px;
`;

const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
`;

export default MainPage;
