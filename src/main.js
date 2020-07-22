import Vue from 'vue';

//通用方法封装
import './common';

//导入业务功能页面
import "@/pages";

//第三方插件包装引入
import '@/plugins/element-ui';
import '@/plugins/fx-table';

//全局过滤器
import '@/filters';

//入口组件
import App from './App.vue';

//Mock
// import '@/mock';

//移除Vue提示
Vue.config.productionTip = false

//store
import store from './store';

//全局样式
import '@/style/main.scss';

new Vue({
  store,

  render: h => h(App),

  methods: {
    /**
    * 根据rem数值返回px数值(解决有些第三方插件不支持rem的属性配置项问题)
    * @param {String}} remStr eg: 如果当前浏览器可视区宽度是1920px, 传入参数 "1rem", 则返回的是 100;
    */
    getPxNumberByRem(remStr) {
      if (remStr) {
        return Number(((store.state.HtmlFontSize) * parseFloat(remStr)).toFixed(2));
      }
    }
  },

  created() {
    const app = this;

    //rem布局处理函数
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