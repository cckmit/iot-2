Date.prototype.format = function (fmt = 'yyyy-MM-dd hh:mm:ss') {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

String.prototype.toAlpha = function (n) {
  return `${this.substring(0, this.length - 1)},${n})`
}

import Vue from 'vue';
import App from './App.vue';
import store from './store';

import ElementUI from 'element-ui';
import '@/style/element-theme/theme/index.css';
Vue.use(ElementUI);

import '@/plugins/fx-table';

import '@/filters';
import '@/style/main.scss';

Vue.config.productionTip = false
// import '@/mock';

new Vue({
  store,

  render: h => h(App),

  methods: {
    getNumberByRem(remStr) {
      if (remStr) {
        return Number(((store.state.HtmlFontSize / 100) * parseFloat(remStr)).toFixed(2));
      }
    }
  },

  created() {
    const app = this;
    (function (doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
          app.$store.commit('set_HtmlFontSize', Number(100 * (clientWidth / 1920)));
        };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
  }
}).$mount('#app');