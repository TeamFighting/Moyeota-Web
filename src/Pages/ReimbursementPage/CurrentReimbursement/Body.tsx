import * as S from './style';
import * as St from '../styles';
import SvgNotCheck from '../../../assets/svg/NotCheck';
import { useState } from 'react';
import SvgCheck from '../../../assets/svg/Check';

interface BodyDataProps {
    data: {
        EachAmount: {
            userId: number;
            amount: number;
            name: string;
            profileImage: string;
            isPartyOwner: boolean;
        }[];
        isPartyOwner: boolean;
        account: { accountNumber: string; bankName: string };
        postId: number;
        potName: string;
        totalAmount: string;
        totalPeople: number;
    };
}

function Body({ data }: BodyDataProps) {
    const [isClicked, setIsClicked] = useState(false);
    const render = data.EachAmount.map((each) => {
        return (
            <St.PartyOneRow>
                <St.MoneyLeft>
                    <St.PartyOneImage src={each.profileImage} />
                    <S.Name>{each.name}</S.Name>
                </St.MoneyLeft>
                <St.MoneyRight>
                    <St.MoneyRight style={{ textDecoration: 'underline' }}>{each.amount}원</St.MoneyRight>
                    {isClicked && <SvgCheck onClick={() => setIsClicked(!isClicked)} />}
                    {!isClicked && <SvgNotCheck onClick={() => setIsClicked(!isClicked)} width={24} height={24} />}
                </St.MoneyRight>
            </St.PartyOneRow>
        );
    });

    return (
        <S.Wrapper>
            <S.Content>
                <S.PotName>{data.potName}</S.PotName>
                <S.TotalAmount>{data.totalAmount}</S.TotalAmount>
                <S.RequestDate>요청일 24.01.17(수) 오후 07:02</S.RequestDate>
                <S.ManagementWrapper
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>파티원</div>
                </S.ManagementWrapper>
                {render}
            </S.Content>
        </S.Wrapper>
    );
}

export default Body;
