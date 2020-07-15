import Vue from 'vue';

Vue.filter('time', (val, format) => {
    return new Date(val).format(format);
})

Vue.filter('week', (val) => {
    return {
        0: '周日',
        1: '周一',
        2: '周二',
        3: '周三',
        4: '周四',
        5: '周五',
        6: '周六',
    }[new Date(val).getDay()];
})