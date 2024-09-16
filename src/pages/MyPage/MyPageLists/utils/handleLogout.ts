export const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('myInfo');
    alert('로그아웃 되었습니다.');
    window.location.href = '/login';
};
