import styled from 'styled-components';
import { motion } from 'framer-motion';
import useBottomSheet from '../../../hooks/useBottonSheet';
import { useEffect, useState } from 'react';
import { useAccountStore } from '../../../stores/AccountStore';
import { BankLists } from '../../../assets/BankLists';

function BankListSheet({ handleClickUp }: { handleClickUp: boolean }) {
    const { sheet, handleUp, content, handleDown } = useBottomSheet('BankListSheet');
    const { setAccountName, clickedAccountList, setClickedAccountList } = useAccountStore();
    const [handleClick, setHandleClick] = useState(handleClickUp);
    useEffect(() => {
        if (handleClick) {
            handleUp();
            setHandleClick(false);
        }
        if (clickedAccountList == false) {
            handleDown();
        }
        return () => {
            handleUp();
        };
    }, [handleClickUp, clickedAccountList]);

    const selectBankName = (selectedBankName: string) => {
        setAccountName(selectedBankName);
        handleDown();
    };

    return (
        <Wrapper ref={sheet}>
            <div
                style={{
                    width: '100%',
                    borderRadius: '20px',
                }}
            >
                <HeaderWrapper>
                    <Handler />
                </HeaderWrapper>
                <div style={{ width: '100%', height: '100%' }}>
                    <BottmSheetText
                        style={{
                            height: '40px',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '35px',
                        }}
                    >
                        은행을 선택해주세요
                    </BottmSheetText>
                    <BottomSheetContentWrapper ref={content}>
                        <Grid>
                            {BankLists.map((item) => (
                                <div
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <BankNames
                                        onClick={() => {
                                            selectBankName(item.name);
                                            setClickedAccountList(false);
                                        }}
                                    >
                                        <img src={item.url} style={{ width: '24px', height: '24px' }} />
                                        <div>{item.name}</div>
                                    </BankNames>
                                </div>
                            ))}
                        </Grid>
                    </BottomSheetContentWrapper>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled(motion.div)<{ isMaxHeight: boolean }>`
    transition: transform 200ms ease-out;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 1000;
    background-color: white;
    border-radius: 26px 26px 0 0;
    height: 100%;
`;
const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    flex-wrap: wrap;
    /* background-color: antiquewhite; */
`;
const BottomSheetContentWrapper = styled.div`
    height: ${window.innerHeight - 260}px;
    overflow: scroll;
    display: flex;
    padding: 0 32px;
    display: flex;
    flex-direction: column;
    background-color: white;
`;

const BankNames = styled.div`
    font-size: 12px;
    font-weight: 400;
    width: 100px;
    height: 80px;
    background-color: #f5f6f8;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const BottmSheetText = styled.div`
    height: 100%;
    font-size: 20px;
    width: 100%;
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    padding: 0 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    position: sticky;
    background-color: white;
`;
const HeaderWrapper = styled.div`
    width: 100%;
    height: 32px;
    background-color: white;
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
