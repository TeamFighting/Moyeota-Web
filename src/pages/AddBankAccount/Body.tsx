import { useRef, useState } from 'react';
import styled from 'styled-components';
import { ChevronDown } from '@assets/svg';
import BankListSheet from './BankListSheet';
import { useAccountStore } from '@stores/AccountStore';

function Body() {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [bankNameListClicked, setBankNameListClicked] = useState(false);
    const { setAccountNumber, accountName, setIsOpenedAccountList: setClickedAccountList } = useAccountStore();

    const handleBankNameList = () => {
        setBankNameListClicked(!bankNameListClicked);
        setClickedAccountList(true);
    };
    const handleBankName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setAccountNumber(e.target.value);
    };
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                gap: '25px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                marginTop: '20px',
            }}
        >
            <div style={{ width: '90%', margin: '0 20px' }}>
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
                    {accountName == null ? (
                        <SelectBankNameText
                            style={{
                                color: '#9a9a9a',
                            }}
                        >
                            <div>은행 선택</div> <ChevronDown width={24} />
                        </SelectBankNameText>
                    ) : (
                        <SelectBankNameText style={{ justifyContent: 'space-between' }}>
                            <div>{accountName}</div>
                            <ChevronDown width={24} />
                        </SelectBankNameText>
                    )}
                </SelectBankNameBtn>
            </div>
            <Bottom>
                <BankListSheet handleClickUp={bankNameListClicked} />
            </Bottom>
        </div>
    );
}

const SelectBankNameText = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: 100%;
    color: #000;
    justify-content: space-between;
`;
const Bottom = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 0%;
    background-color: white;
    transition: height 0.3s ease;
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
    height: 35px;
    font-size: 20px;
    border: none;
    border-bottom: 2px solid #9a9a9a;
    margin-top: 25px;
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
    line-height: 157%;
`;

const SelectBankNameBtn = styled.button`
    width: 100%;
    height: 35px;
    margin-top: 42px;
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
