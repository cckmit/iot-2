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

/**
 * 生成测试数据
 * @param {*} param 
 */
export function getRandomData(param) {
    const { min, max, length, fixed = 0 } = param;
    let result = null;

    if (typeof length !== 'number') {
        result = (Math.random() * 10 * (max / 10) + min).toFixed(fixed);
        result = Number(result);
    }
    else {
        result = [];
        let i = 0;
        for (; i < length; i++) {
            let n = (Math.random() * 10 * (max / 10) + min).toFixed(fixed);
            result.push(Number(n));
        }
    }
    return result;
}

/**
 * 数组分组
 * @param {array} data 源数组
 * @param {number} num 分组之后每个数组的长度
 */
export function arrayGroup(data, num) {

    var result = [];

    for (var i = 0, len = data.length; i < len; i += num) {
        result.push(data.slice(i, i + num));
    }

    return result;
}