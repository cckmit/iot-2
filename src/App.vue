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

      
    </Layer>

    <!-- 调试层 -->
    <Layer :index="9">
      <!-- <div style="color:#fff;">{{CurrentRegions}}</div> -->
    </Layer>
  </div>
</template>

<script>
import Vue from "vue";
import Modal from "@/components/modal";
Vue.use(Modal);
import Layer from "@/components/Layer.vue";
import Map from "@/components/Map";
import Headerbar from "@/components/Headerbar.vue";
import SvgIcon from "@/components/SvgIcon";
Vue.use(SvgIcon);

import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    Layer,
    Modal,
    Map,
    Headerbar
  },

  computed: {
    ...mapState({
      CurrentRegions: state => state.CurrentRegions
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
