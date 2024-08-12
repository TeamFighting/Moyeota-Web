const handleMessage = (event: any) => {
    try {
        if (typeof event.data === 'string') {
            const data = JSON.parse(event.data);
            if (data.token !== undefined) {
                localStorage.setItem('mobileAccessToken', data.token.toString());
                alert('로그인 되었습니다');
            }
        }
    } catch (error) {
        console.error(error);
    }
};
