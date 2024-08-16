import { useEffect, useState } from 'react';
import instance from '@apis';
import { useMyPotContentStore } from '@stores/MyPotContentStore';
import * as S from '../MainPage/style';
import styled from 'styled-components';
import { Chevronleft } from '@assets/svg';
import { Icon } from '../DetailPage/style';
import SingleContent from '@pages/MainPage/Components/SingleContent';
function PotPage() {
    const { id } = JSON.parse(localStorage.getItem('myInfo') as string);
    const { MyAppliedPotContent, MyPotContent, setMyPotContent, setMyAppliedPotContent, setTotalMyPotContent } =
        useMyPotContentStore((state) => state);
    const [pageName, setPageName] = useState('MyPot');
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        getMyPot();
        getAppliedPot();
    }, []);
    useEffect(() => {
        setTotalMyPotContent([...MyAppliedPotContent, ...MyPotContent]);
    }, [MyAppliedPotContent, MyPotContent]);
    const getMyPot = async () => {
        try {
            const res = await instance.get(`/posts/users/${id}`, {
                params: {
                    page: 0,
                },
            });
            setMyPotContent(res.data.data.content);
        } catch (e) {
            //console.log(e);
        }
    };
    const getAppliedPot = async () => {
        try {
            const res = await instance.get(`/participation-details/all`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (res.status === 200) {
                console.log(res.data.data);
                setMyAppliedPotContent(res.data.data);
            }
        } catch (e: any) {
            console.log(e);
        }
    };
    const navigateMypot = () => {
        setPageName('MyPot');
    };
    const navigateMyAppliedpot = () => {
        setPageName('AppliedPot');
    };
    const navigateTotal = () => {
        setPageName('Total');
    };
    const [isTotalActive, setIsTotalActive] = useState(false);
    const [isMyPotActive, setIsMyPotActive] = useState(true);
    const [isAppliedActive, setIsAppliedActive] = useState(false);
    return (
        <div>
            <S.ModalContent>
                <Top>
                    <IconWrapper>
                        <Chevronleft width={24} />
                    </IconWrapper>
                    <Title>팟 이용내역</Title>
                </Top>
                <CategoryWrapper>
                    <Category
                        isActivate={isTotalActive}
                        onClick={() => {
                            navigateTotal();
                            setIsTotalActive(true);
                            setIsMyPotActive(false);
                            setIsAppliedActive(false);
                        }}
                    >
                        전체
                    </Category>
                    <Category
                        isActivate={isMyPotActive}
                        onClick={() => {
                            navigateMypot();
                            setIsMyPotActive(true);
                            setIsTotalActive(false);
                            setIsAppliedActive(false);
                        }}
                    >
                        내 팟
                    </Category>
                    <Category
                        isActivate={isAppliedActive}
                        onClick={() => {
                            navigateMyAppliedpot();
                            setIsAppliedActive(true);
                            setIsTotalActive(false);
                            setIsMyPotActive(false);
                        }}
                    >
                        내가 신청한 팟
                    </Category>
                </CategoryWrapper>
                {pageName == 'Total' && (
                    <S.ContentWrapper>
                        <SingleContent from={'Total'} />
                    </S.ContentWrapper>
                )}
                {pageName == 'MyPot' && (
                    <S.ContentWrapper>
                        <SingleContent from={'MyPot'} />
                    </S.ContentWrapper>
                )}
                {pageName == 'AppliedPot' && (
                    <S.ContentWrapper>
                        <SingleContent from={'AppliedPot'} />
                    </S.ContentWrapper>
                )}
            </S.ModalContent>
        </div>
    );
}
const Top = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 78px;
`;
const IconWrapper = styled(Icon)`
    position: absolute;
    left: 20px;
    top: 20px;
`;
const Title = styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: center;
`;
const CategoryWrapper = styled.div`
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ebebeb;
    gap: 17px;
`;
const Category = styled.div<{ isActivate?: boolean }>`
    color: var(--Gray-Text-1, #9a9a9a);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 110px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #343434;
    border-bottom: ${(props) => (props.isActivate ? '2px solid #9a9a9a' : '0px')};

    &:hover {
        color: #343434;
        border-bottom: ${(props) => (props.isActivate ? '2px solid #9a9a9a' : '0px')};
    }
    &:active {
        color: #343434;
        border-bottom: ${(props) => (props.isActivate ? '2px solid #9a9a9a' : '0px')};
    }
    &:focus {
        color: #343434;
        border-bottom: ${(props) => (props.isActivate ? '2px solid #9a9a9a' : '0px')};
    }
`;

export default PotPage;
