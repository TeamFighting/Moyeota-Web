
function getDays(departureTime: string) {
    const year = departureTime.slice(0, 4);
    const month = departureTime.slice(5, 7);
    const date = departureTime.slice(8, 10);

    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const newDate = new Date(departureTime); // 요일을 영어로 얻기 위함
    const day = days[newDate.getDay()];

    const splitedDay = [year, month, date, day]
  return splitedDay;

  
}

export default getDays
