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
    } else {
      timePart = '오후 ' + (hour - 12) + ':' + minute;
    }
    return timePart;
  }
}

export default ISOto12;
