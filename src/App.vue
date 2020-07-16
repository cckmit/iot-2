<template>
  <div class="app">
    <Modal />

    <!-- 地图层 -->
    <Layer :index="1">
      <Map></Map>
    </Layer>

    <!-- 面板层 -->
    <Layer :index="2">
      <Headerbar></Headerbar>

      <Sidebox />

      <FooterBox :visible="FooterBoxVisible" @change="$store.commit('set_FooterBoxVisible',$event)">
        <!-- 数据图表 -->
        <template v-if="CurrentDiskMenu==='CHART'">
          <!-- 单位 -->
          <template v-if="CurrentDiskSubMenu==='CUSTOMER'">
            <ColumnItem title="单位运行情况" boldTitle>
              <Customer_01></Customer_01>
            </ColumnItem>
            <ColumnItem title="本年度单位运行情况" boldTitle>
              <Customer_02></Customer_02>
            </ColumnItem>
          </template>

          <!-- 行业 -->
          <template v-if="CurrentDiskSubMenu==='INDUSTRY'">
            <ColumnItem title="各行业单位数占比" boldTitle>
              <Industry_01></Industry_01>
            </ColumnItem>
            <ColumnItem title="各行业单位运行趋势图" boldTitle>
            </ColumnItem>
          </template>

          <!-- 设备 -->
          <template v-if="CurrentDiskSubMenu==='EQUIPMENT'">设备</template>
        </template>

        <!-- 场所搜索 -->
        <template v-if="CurrentDiskMenu==='PLACE_SEARCH'">场所搜索</template>
      </FooterBox>

      <DiskMenu
        :value="CurrentDiskMenu"
        @change="$store.commit('set_CurrentDiskMenu',$event)"
        :sub="CurrentDiskSubMenu"
        @sub-change="$store.commit('set_CurrentDiskSubMenu',$event)"
      />
    </Layer>

    <!-- 调试层 -->
    <Layer :index="99">
      <div class="debug" v-show="debug">
        <pre>CurrentRegions:{{CurrentRegions}}</pre>
        <pre>CurrentDiskMenu:{{CurrentDiskMenu}}</pre>
        <pre>CurrentDiskSubMenu:{{CurrentDiskSubMenu}}</pre>
        <pre>HtmlFontSize:{{HtmlFontSize}}</pre>
        <pre>FooterBoxVisible:{{FooterBoxVisible}}<el-button
  size="mini"
  @click="$store.commit('set_FooterBoxVisible',true)"
>setTrue</el-button></pre>
      </div>
      <el-button class="debug-btn" type="primary" size="mini" @click="debug=!debug">Debug</el-button>
    </Layer>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import Modal from "@/components/modal";
Vue.use(Modal);
import SvgIcon from "@/components/SvgIcon";
Vue.use(SvgIcon);
import ColumnItem from "@/components/ColumnItem";
Vue.component(ColumnItem.name, ColumnItem);
import Percentbar from "@/components/Percentbar";
Vue.component(Percentbar.name, Percentbar);
import VeCharts from "v-charts";
Vue.use(VeCharts);

import Layer from "@/components/Layer.vue";
import Map from "@/components/Map";
import Headerbar from "@/components/Headerbar.vue";
import Sidebox from "@/components/Sidebox.vue";
import DiskMenu from "@/components/DiskMenu.vue";
import FooterBox from "@/components/FooterBox.vue";

//导入业务功能页面
import "@/pages";

export default {
  name: "App",

  components: {
    Layer,
    Modal,
    Map,
    Headerbar,
    Sidebox,
    DiskMenu,
    FooterBox
  },

  data() {
    return {
      debug: false
    };
  },

  computed: {
    ...mapState({
      CurrentRegions: state => state.CurrentRegions,
      CurrentDiskMenu: state => state.CurrentDiskMenu,
      CurrentDiskSubMenu: state => state.CurrentDiskSubMenu,
      HtmlFontSize: state => state.HtmlFontSize,
      FooterBoxVisible: state => state.FooterBoxVisible
    })
  },

  methods: {},

  created() {
    // this.$modal({
    //   title: "测试",
    //   placement: "top-right",
    //   component: () => import("@/pages/ModalPage_01.vue")
    // });
    // this.$modal({
    //   title: "测试",
    //   placement: "center",
    //   component: () => import("@/pages/ModalPage_01.vue")
    // });
  }
};
</script>

<style lang="scss" src="./App.scss"></style>
