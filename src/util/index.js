/**
 * 将日期天数数字转化为获取的某个时间字符串
 * @param {number} count 
 */
export function daysToAgoTime(count) {
    let time1 = new Date();
    time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000));
    let time2 = new Date();
    time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count));
    let Y2 = time2.getFullYear();
    let M2 = ((time2.getMonth() + 1) > 9 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1));
    let D2 = (time2.getDate() > 9 ? time2.getDate() : '0' + time2.getDate());
    return Y2 + '-' + M2 + '-' + D2;
}