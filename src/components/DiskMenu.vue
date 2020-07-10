<template>
  <div class="disk-menu">
    <div
      class="disk-menu--item"
      v-for="(i,index) in items"
      :key="i.value"
      :class="'item-'+(index+1)"
    >
      <!-- <SvgIcon class="disk-menu--item__icon" :icon-class="i.icon"></SvgIcon>
      <div class="disk-menu--item__label">
        <span v-for="(t,t_index) in i.label" :key="t_index">{{t}}</span>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "DiskMenu",

  data() {
    return {
      items: [
        {
          label: "数据图表",
          icon: "chart-bar",
          value: "CHART"
        },
        {
          label: "场所搜索",
          icon: "map",
          value: "PLACE_SEARCH"
        }
      ]
    };
  }
};
</script>