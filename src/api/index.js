import http from '@/server';

const baseApi = '/api/govShow';

/**
 * 获取侧边栏汇总信息
 */
export function getSummary() {
    return http.get(`${baseApi}?optionType=status`);
}