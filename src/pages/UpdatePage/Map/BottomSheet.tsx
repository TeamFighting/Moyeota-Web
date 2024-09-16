import LocationMarkerGreen from '@assets/svg/LocationMarkerGreen';
import { BOTTOM_SHEET_HEIGHT, WINDOW_HEIGHT } from '@constants';
import styled from 'styled-components';

interface BottomSheetProps {
    destination?: string;
}

function BottomSheet({ destination }: BottomSheetProps) {
    return (
        <Wrapper>
            <HeaderWrapper>
                <Handler />
            </HeaderWrapper>
            <TextWrapper>
                <Title>도착지를 설정해주세요</Title>
                <DestinationWrapper>
                    {destination && (
                        <>
                            <LocationMarkerGreen style={{ width: 24, height: 24, paddingRight: 4 }} />
                            <Destination>{destination}</Destination>
                        </>
                    )}
                </DestinationWrapper>
            </TextWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 1;
    width: 100%;
    height: ${WINDOW_HEIGHT}px;
    border-radius: 26px 26px 0 0;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    height: ${BOTTOM_SHEET_HEIGHT}px;
    background-color: white;
`;

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

const TextWrapper = styled.div`
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
`;

const DestinationWrapper = styled.div`
    display: flex;
    padding-top: 14px;
`;

const Title = styled.div`
    color: #343434;
    font-size: 22px;
    font-family: Pretendard;
    font-weight: 700;
`;

const Destination = styled.div`
    color: #9a9a9a;
    font-size: 14px;
    font-family: Pretendard;
    font-weight: 500;
`;
export default BottomSheet;
