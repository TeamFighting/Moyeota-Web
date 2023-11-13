import styled from 'styled-components'

function UpdateExitButton() {
    const handleSave = async () => {
        const token = import.meta.env.VITE_AUTH_BEARER_TOKEN
        try {
            const response = await fetch('http://moyeota.shop:80/api/users/info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: 'test@seoultech.ac.kr',
                    gender: true,
                    name: '송지원',
                    phoneNumber: '01012345678',
                    profileImage:
                        'https://lh3.googleusercontent.com/a/ACg8ocInV_3Zw6QwMwZThJoBEbDwJQlTetmOI8AoezeF5s60pfE=s96-c',
                }),
            })

            if (response.status == 200) {
                console.log('성공')
            } else {
                console.error('실패')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <Wrapper>
            <Button type="button" onClick={handleSave}>
                저장하기
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 128px;
    background-color: rgba(0, 0, 0, 0);
    bottom: 0;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    z-index: 2;
`

const Button = styled.button`
    width: 335px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--Green-Button, #1edd81);
    border: none;
    font-size: 16px;
    color: white;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.54px;
    z-index: 3;
`

export default UpdateExitButton
