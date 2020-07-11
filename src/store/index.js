import Vue from 'vue'
import Vuex from 'vuex'
import modal from './modules/modals';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //当前活跃的行政区划列表
    CurrentRegions: [],

    //当前活跃的圆盘菜单项(数据图表:CHART, 场所搜索:PLACE_SEARCH)
    CurrentDiskMenu: '',

    //当前活跃的圆盘子菜单项(单位:CUSTOMER, 行业:INDUSTRY, 设备:EQUIPMENT)
    CurrentDiskSubMenu: '',

    //html字体大小
    HtmlFontSize: 0
  },
  mutations: {
    set_CurrentRegions(state, val) {
      state.CurrentRegions = val;
    },
    set_CurrentDiskMenu(state, val) {
      state.CurrentDiskMenu = val;
      //如果没有记忆中的子菜单，则默认选中一项(因为父菜单没有对应的单独展示的内容)
      if (val === 'CHART' && !state.CurrentDiskSubMenu) {
        state.CurrentDiskSubMenu = "CUSTOMER";
      }
    },
    set_CurrentDiskSubMenu(state, val) {
      state.CurrentDiskSubMenu = val;
    },
    set_HtmlFontSize(state, val) {
      state.HtmlFontSize = val;
    }
  },
  actions: {

  },
  modules: {
    modal
  }
})
