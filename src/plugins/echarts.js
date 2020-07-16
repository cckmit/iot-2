import echarts from "echarts";
import echart_theme from './echart_theme.json';

echarts.registerTheme('xiyu', echart_theme);

export default echarts;

//色板1
export const colors = [
    'rgb(100,141,255)',
    'rgb(49,221,221)',
    'rgb(109,106,239)',
    'rgb(49,108,140)',
    'rgb(236,212,144)',
    'rgb(123,179,106)',
    'rgb(62,191,255)',
    'rgb(14,118,204)',
    'rgb(135,201,188)',
    'rgb(65,84,117)',
    'rgb(65,84,117)',
]
colors.toAlpha = function (n) {
    return this.map(i => {
        return `${i.substring(0, i.length - 1)},${n})`
    })
}


//色板2
export const colors2 =
    new Array(
        'rgb(15,216,177)',
        'rgb(255,211,102)',
        'rgb(109,106,239)',
        'rgb(255,108,126)',
        'rgb(26,146,255)'
    )

colors2.toAlpha = function (n) {
    return this.map(i => {
        return `${i.substring(0, i.length - 1)},${n})`
    })
}

//色板映射表
export const colorMap = {
    warning: 'rgb(255,211,102)',
    both: 'rgb(109,106,239)',
    error: 'rgb(255,108,126)',
    normal: 'rgb(15,216,177)',
}