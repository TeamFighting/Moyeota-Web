import styled from "styled-components";

function BottomSheetHandle() {
  return (
    <HeaderWrapper>
      <Handler />
    </HeaderWrapper>
  );
}
const HeaderWrapper = styled.div`
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  border-radius: 26px 26px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Handler = styled.div`
  right: 0;
  justify-content: center;
  align-self: center;
  cursor: pointer;
  border-radius: 26px;
  background-color: #ededed;
  width: 50px;
  height: 7px;
`;
export default BottomSheetHandle;
