import Vue from 'vue';
import App from './App.vue';
import store from './store';
import ElementUI from 'element-ui';
import '@/style/element-theme/theme/index.css';
import '@/style/main.scss';
Vue.use(ElementUI);

Vue.config.productionTip = false
import '@/mock';

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


