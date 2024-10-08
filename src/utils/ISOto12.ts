function ISOto12(departureTime: string | undefined | null) {
    if (departureTime == undefined || departureTime == null) {
        return '';
    } else {
        let timePart = departureTime.match(/\d{2}:\d{2}/)?.[0];
        if (!timePart) {
            return '';
        }
        const hour = parseInt(timePart.split(':')[0]);
        const minute = timePart.split(':')[1];
        if (hour < 12) {
            timePart = '오전 ' + hour + ':' + minute;
        } else if (hour > 12) {
            timePart = '오후 ' + (hour - 12) + ':' + minute;
        } else if (hour == 12) {
            timePart = '오후 ' + hour + ':' + minute;
        }
        return timePart;
    }
}

export function ISOtoDate(departureTime: string | undefined | null) {
    if (departureTime == undefined || departureTime == null) {
        return '';
    } else {
        const date = new Date(departureTime);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year + '년 ' + month + '월 ' + day + '일';
    }
}

export default ISOto12;
