import http from '@/server';

/**
 * 获取侧边栏汇总信息
 */
export function getSummary() {
    return http.get('/api/summary');
}