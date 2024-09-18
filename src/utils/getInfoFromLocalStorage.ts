export function getMyInfoFromLocalStorage() {
    const myInfo = JSON.parse(localStorage.getItem('myInfo')!);
    return myInfo;
}
export function getAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
}
