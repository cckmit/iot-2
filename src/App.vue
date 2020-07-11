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

import Layer from "@/components/Layer.vue";
import Map from "@/components/Map";
import Headerbar from "@/components/Headerbar.vue";
import Sidebox from "@/components/Sidebox.vue";
import DiskMenu from "@/components/DiskMenu.vue";

export default {
  name: "App",

  components: {
    Layer,
    Modal,
    Map,
    Headerbar,
    Sidebox,
    DiskMenu
  },

  data() {
    return {
      debug: true
    };
  },

  computed: {
    ...mapState({
      CurrentRegions: state => state.CurrentRegions,
      CurrentDiskMenu: state => state.CurrentDiskMenu,
      CurrentDiskSubMenu: state => state.CurrentDiskSubMenu,
      HtmlFontSize: state => state.HtmlFontSize,
    })
  },

  created() {
    // this.$modal({
    //   title: "测试",
    //   component: () => import("@/components/Percentbar.vue")
    // });
  }
};
</script>

<style lang="scss" src="./App.scss"></style>
