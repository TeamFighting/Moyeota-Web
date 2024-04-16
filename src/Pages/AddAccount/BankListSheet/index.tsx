import styled from 'styled-components';
import { motion } from 'framer-motion';
import useBottomSheet from '../../../Hooks/useBottonSheet';

function BankListSheet({ handleClickUp }: { handleClickUp: boolean }) {
    const { sheet, handleUp, content } = useBottomSheet('BottomSheet');
    if (handleClickUp) {
        handleUp();
    }
    const BankName = [
        'NH농협',
        '카카오뱅크',
        'KB국민',
        '토스벵크',
        '신한',
        '우리',
        'IBK기업',
        '하나',
        '새마을',
        '부산',
        '대구',
        '케이뱅크',
        '신협',
        '우체국',
        'SC제일',
        '경남',
        '광주',
        '수협',
        '전북',
        '제주',
        '씨티',
    ];
    return (
        <Wrapper ref={sheet}>
            <div
                style={{
                    width: '90%',
                    height: 'wrap-content',
                    borderRadius: '26px',
                    border: '10px solid #e0e0e0',
                }}
            >
                <HeaderWrapper>
                    <Handler />
                </HeaderWrapper>
                <div ref={content} style={{ width: '100%', height: '500px', overflow: 'scroll' }}>
                    <BottomSheetContentWrapper>
                        <BottmSheetText style={{ height: '100px' }}>은행을 선택해주세요</BottmSheetText>
                        <Grid>
                            {BankName.map((name) => (
                                <BankNames>{name}</BankNames>
                            ))}
                        </Grid>
                    </BottomSheetContentWrapper>
                </div>
            </div>
        </Wrapper>
    );
}
const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    margin: 20px 0;

    justify-content: center;
    align-items: center;
`;
const BankNames = styled.div`
    font-size: 12px;
    font-weight: 400;
    width: 100px;
    height: 80px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e0e0e0;
`;
const BottmSheetText = styled.div`
    height: 100%;
    font-size: 20px;
    width: 100%;
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    position: sticky;
`;
const Wrapper = styled(motion.div)<{ isMaxHeight: boolean }>`
    display: flex;
    flex-direction: column;
    z-index: 10000;
    width: 100%;
    height: 600px;
    transition: transform 200ms ease-out;
    justify-content: center;
    align-items: center;
`;

const BottomSheetContentWrapper = styled.div`
    height: 500px;
    overflow: scroll;
    border-radius: 0 0 26px 26px;
    display: flex;
    padding: 0 20px;
    background-color: white;
    display: flex;
    flex-direction: column;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    height: 20px;
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

export default BankListSheet;
