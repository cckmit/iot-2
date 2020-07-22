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
 * 获取天气信息
 */
export function getWeather() {
    return http.get(`${baseApi}?optionType=weather`);
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
    const now = new Date().format('yyyy-mm-dd');
    return http.get(`${baseApi}?optionType=customerOperation&StartTime=${daysToAgoTime(days)}&EndTime=${now}`);
}

/**
 * 单位-单位年度运行情况(原report1)
 */
export function getCustomerOperationYear() {
    return http.get(`${baseApi}?optionType=customerOperationYear`);
}

/**
 * 行业- 各行业单位数占比(原report2)
 */
export function getIndustryCustomerRate() {
    return http.get(`${baseApi}?optionType=industryCustomerRate`);
}

/**
 * 登出
 */
export function logout() {
    return http.delete(`/api/login`);
}
