export const useGetRefreshToken = () => {
    // 브라우저내에 있는 쿠키 전체 가져온 후 세미콜론 기준으로 분리 (쿠키 각각은 세미콜론으로 구분되기 때문)
    const cookiesArr = document.cookie.split(';');

    for (const cookie of cookiesArr) {
        if (cookie.includes('refreshToken')) {
            const token = cookie.replace(' ', '');
            const refreshToken = token.slice(13, token.length);
            return refreshToken;
        }
    }
};
