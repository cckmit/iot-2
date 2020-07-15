import http from '@/server';
import { daysToAgoTime } from '@/util';

const baseApi = '/api/govShow';

/**
 * 获取头部区域信息
 */
export function getLocation() {
    return http.get(`${baseApi}?optionType=location`);
}

/**
 * 获取侧边栏汇总信息
 */
export function getSummary() {
    return http.get(`${baseApi}?optionType=status`);
}

/**
 * 单位-单位运行情况(原report1)
 * @param {number} days 近?天 
 */
export function getCustomerOperation(days) {
    const now = new Date().Format('yyyy-mm-dd');
    return http.get(`${baseApi}?optionType=customerOperation&StartTime=${daysToAgoTime(days)}&EndTime=${now}`);
}
