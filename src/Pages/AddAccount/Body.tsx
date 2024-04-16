import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ChevronDown } from '../../assets/svg';
import BankListSheet from './BankListSheet';
import { useAccountStore } from '../../state/store/AccountStore';

function Body() {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [bankNameListClicked, setBankNameListClicked] = useState(false);
    const { accountNumber, setAccountNumber, accountName } = useAccountStore();
    useEffect(() => {
        console.log(isFocused);
    }, [isFocused]);
    const handleBankNameList = () => {
        console.log('handleBankNameList');
        setBankNameListClicked(!bankNameListClicked);
    };
    const handleBankName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setAccountNumber(e.target.value);
    };
    return (
        <div
            style={{
                width: '90%',
                position: 'relative',
                gap: '25px',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <Text>
                계좌번호를 <br /> 입력해주세요
            </Text>
            <StyledInput
                isFocused={isFocused}
                ref={inputRef}
                onFocus={() => setIsFocused(true)}
                placeholder="계좌번호 입력"
                type="number"
                onChange={handleBankName}
            />
            <SelectBankNameBtn onClick={handleBankNameList}>
                {accountName == '' ? (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            width: '100%',
                            color: '#9a9a9a',
                        }}
                    >
                        <div>은행 선택</div> <ChevronDown width={24} />
                    </div>
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            width: '100%',
                            color: 'black',
                        }}
                    >
                        <div>{accountName}</div>
                        <ChevronDown width={24} />
                    </div>
                )}
            </SelectBankNameBtn>
            <Bottom>
                <BankListSheet accountNumber={accountNumber} handleClickUp={bankNameListClicked} />
            </Bottom>
        </div>
    );
}
const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 0px;
    background-color: red;
    align-items: center;
`;

const Text = styled.div`
    height: 60px;
    font-size: 20px;
    width: 100%;
    color: #000;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const StyledInput = styled.input<{ isFocused: boolean }>`
    width: 100%;
    height: 60px;
    font-size: 20px;
    border: none;
    border-bottom: 2px solid #9a9a9a;
    background-image: ${(props) => (props.isFocused ? 'linear-gradient(to right, #1edd81, #1edd81)' : 'none')};
    background-repeat: ${(props) => (props.isFocused ? 'no-repeat' : 'none')};
    background-position: ${(props) => (props.isFocused ? 'left bottom' : 'none')};
    background-size: 0% 2px;
    transition: ${(props) => (props.isFocused ? 'background-size 0.3s ease' : 'none')};
    &:focus {
        outline: none;
        background-size: 100% 2px;
        border: none;
    }
    color: #1d1d1d;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 157%; /* 34.54px */
`;

const SelectBankNameBtn = styled.button`
    width: 100%;
    height: 60px;
    border: none;
    border-bottom: 2px solid #9a9a9a;
    background-color: #fff;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
`;
export default Body;
