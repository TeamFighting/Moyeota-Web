import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../../Constants/constant';
import BlogBottomSheet from './BlogBottonSheet';
import NaverMap from '../NaverMap/NaverMap';

function Blog() {
  return (
    <Container>
      <Header>
        {/* <Chevronleft width={24} height={24} />
        <LocationHeader /> */}
      </Header>
      <Body>
        <NaverMap from={'mainpage'} />
        <Bottom>
          <BlogBottomSheet />
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
  overflow: hidden;
`;

const Header = styled.div`
  height: ${HEADER_HEIGHT}px;
  position: sticky;
  border: 1px solid black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 4%;
  background-color: pink;
  border: 5px solid black;
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
  height: 100%;
`;

export default Blog;
