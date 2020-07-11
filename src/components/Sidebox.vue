<template>
  <div class="sidebox" :class="{visible:vVisible}">
    <div class="sidebox-header">
      <span class="sidebox-title">XXXX统计</span>
    </div>

    <div class="sidebox-body">
      <div class="sidebox-item" v-for="i in items" :key="i.prop">
        <div class="sidebox-item--start">
          <SvgIcon :icon-class="i.icon"></SvgIcon>
        </div>
        <div class="sidebox-item--end">
          <strong>{{vm[i.prop]||'-'}}</strong>
          <span>{{i.label}}</span>
        </div>
      </div>
    </div>

    <div class="sidebox-handler" @click="toggle">
      <i class="el-icon-arrow-left"></i>
    </div>
  </div>
</template>

<script>
import { getSummary } from "@/api";

export default {
  name: "Sidebox",

  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      items: [
        {
          prop: "businessCount",
          label: "接入单位数",
          icon: "louyu-circle"
        },
        {
          prop: "equipmentCount",
          label: "接入设备数",
          icon: "shebei-circle"
        },
        {
          prop: "placeCount",
          label: "场所总数",
          icon: "map-circle-2"
        }
      ],

      vm: {},

      vVisible: this.visible
    };
  },

  watch: {
    visible(val) {
      this.vVisible = val;
    },
    vVisible(val) {
      this.$emit("update:visible", val);
    }
  },

  methods: {
    getData() {
      getSummary().then(res => {
        this.vm = res.data;
      });
    },

    toggle() {
      this.vVisible = !this.vVisible;
    }
  },

  created() {
    this.getData();
  }
};
</script>