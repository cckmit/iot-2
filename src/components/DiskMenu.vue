<template>
  <div class="disk-menu">
    <div
      class="disk-menu--item"
      v-for="(i,index) in items"
      :key="i.value"
      @click="current=i.value"
      :class="['item-'+(index+1),{active:current===i.value}]"
    >
      <SvgIcon class="disk-menu--item__icon" :icon-class="current===i.value?i.activeIcon:i.icon"></SvgIcon>
      <div class="disk-menu--item__label">
        <span v-for="(t,t_index) in i.label" :key="t_index">{{t}}</span>
      </div>
      <div
        class="disk-menu--item__children"
        v-if="i.children && i.children.length"
        v-show="current===i.value"
      >
        <div
          class="disk-menu--subitem"
          v-for="j in i.children"
          :key="j.value"
          @click="subCurrent=j.value"
          :class="{active:subCurrent===j.value}"
        >
          <i class="corner corner-1"></i>
          <i class="corner corner-2"></i>
          <i class="corner corner-3"></i>
          <i class="corner corner-4"></i>

          <div class="disk-menu--subitem__icon">
            <SvgIcon :icon-class="j.icon"></SvgIcon>
          </div>

          <div class="disk-menu--subitem__label">
            <span>{{j.label}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiskMenu",

  props: {
    value: {},
    sub: {}
  },

  watch: {
    value(val) {
      this.current = val;
    },
    sub(val) {
      this.subCurrent = val;
    },
    current(val) {
      this.$emit("change", val);
    },
    subCurrent(val) {
      this.$emit("sub-change", val);
    }
  },

  data() {
    return {
      current: this.value,
      subCurrent: this.sub,
      items: [
        {
          label: "数据图表",
          icon: "chart-bar-2",
          activeIcon: "chart-bar",
          value: "CHART",
          children: [
            {
              label: "单位",
              icon: "louyu",
              value: "CUSTOMER"
            },
            {
              label: "行业",
              icon: "hangye",
              value: "INDUSTRY"
            },
            {
              label: "设备",
              icon: "shebei",
              value: "EQUIPMENT"
            }
          ]
        },
        {
          label: "场所搜索",
          activeIcon: "map",
          icon: "map-2",
          value: "PLACE_SEARCH"
        }
      ]
    };
  }
};
</script>