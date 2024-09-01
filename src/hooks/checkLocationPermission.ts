function checkLocationPermission() {
    navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
        if (result.state === 'granted') {
            console.log('geolocation is granted');
        } else if (result.state === 'prompt') {
            console.log('geolocation is prompt');
        } else if (result.state === 'denied') {
            alert('위치 서비스가 차단되었습니다. 위치 서비스를 사용하려면 브라우저 설정에서 권한을 허용해주세요.');
        }
    });
}

export default checkLocationPermission;
