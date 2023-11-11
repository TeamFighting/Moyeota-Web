import * as S from "./style";
import DetailHeader from "./DetailHeader";
import DetailBody from "./DetailBody";
import DetailBottom from "./DetailBottom";
import DetailPartySection from "./DetailPartySection";
import usePostDataStore from "../../../../zustand/store/PostDataStore";
import PotCreateStore from "../../../../zustand/store/PotCreateStore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import UpdateButton from "../Button/UpdateButton";

function DetailPage() {
  const [scroll, setScroll] = useState(0);
  const [dividerHeight, setDividerHeight] = useState(6);
  const { postId } = PotCreateStore();
  const { setPostData } = usePostDataStore();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScroll(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // scroll 값이 변경될 때마다 Divider 컴포넌트의 height 값을 업데이트
    if (scroll > 720) {
      setDividerHeight(10);
    } else {
      setDividerHeight(6);
    }
  }, [scroll]);

  useEffect(() => {
    if (postId) {
      fetch(`http://moyeota.shop:80/api/posts/${postId}`)
        .then((response) => response.json())
        .then((fetchedData) => {
          setPostData(fetchedData.data);
          console.log("API 응답 데이터:", fetchedData.data);
        })
        .catch((error) => {
          console.error("API 호출 중 에러:", error);
        });
    }
  }, [postId, setPostData]);

  return (
    <S.Container>
      <DetailHeader />
      <DetailBody />
      <Divider style={{ height: "10px" }} />
      <DetailBottom />
      <Divider style={{ height: `${dividerHeight}px` }} />
      <DetailPartySection />
      {/* <UpdateButton /> */}
    </S.Container>
  );
}

const Divider = styled.div`
  width: 100vw;
  background-color: #f5f6f8;
`;

export default DetailPage;
