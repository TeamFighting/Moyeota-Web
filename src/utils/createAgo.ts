
function createAgo(createAt: string) {
    const now = new Date();
    const createAtDate = new Date(createAt);
    const timeDiff = now.getTime() - createAtDate.getTime();
    const millisecondsMonth = 1000 * 60 * 60 * 24 * 30;
    const millisecondsDay = 1000 * 60 * 60 * 24;
    const millisecondsHour = 1000 * 60 * 60;
    const millisecondsMinute = 1000 * 60;
  
    const monthDifference = Math.floor(timeDiff / millisecondsMonth);
    const daysDifference = Math.floor(timeDiff / millisecondsDay);
    const hoursDifference = Math.floor(
      (timeDiff % millisecondsDay) / millisecondsHour
    );
    const minutesDifference = Math.floor(
      (timeDiff % millisecondsHour) / millisecondsMinute
    );
    let ago: string;
    if (monthDifference > 0 && monthDifference < 12) {
      ago = monthDifference + '달 전';
    } else if (daysDifference > 0 && daysDifference < 30) {
      ago = daysDifference + '일 전';
    } else if (hoursDifference > 0 && hoursDifference < 24) {
      ago = hoursDifference + '시간 전';
    } else if (minutesDifference > 0 && minutesDifference < 60) {
      ago = minutesDifference + '분 전';
    } else {
      ago = '방금 전';
    }
  return ago;
  
}

export default createAgo
