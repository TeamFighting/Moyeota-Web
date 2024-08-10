export const ChatTime = (time: string): string => {
    let newTime: string = time;
    if (time === 'a few seconds ago') newTime = '방금 전';
    if (time === 'in a few seconds') newTime = '방금 전';
    if (time === 'a day ago') newTime = '어제';
    if (time === 'a month ago') newTime = '한달 전';
    if (time === 'a year ago') newTime = '작년';
    if (time === 'a minute ago') newTime = '1분 전';
    if (time === 'an hour ago') newTime = '1시간 전';
    if (time.match(/minutes ago/)) newTime = time.replace('minutes ago', '분 전');
    if (time.match(/hours ago/)) newTime = time.replace('hours ago', '시간 전');
    if (time.match(/days ago/)) newTime = time.replace('days ago', '일 전');
    if (time.match(/months ago/)) newTime = time.replace('months ago', '달 전');
    if (time.match(/years ago/)) newTime = time.replace('years ago', '년 전');
    return newTime;
};
