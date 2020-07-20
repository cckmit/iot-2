<template>
  <div
    class="column-item"
    :class="[splitOnBody?'column-item--split-on-body':'',vertical?'column-item--vertical':'',smallTitle?'column-item--sm-title':'',splitLine?'':'no-splitline']"
    :style="style"
  >
    <div class="column-item--header" :style="headerStyle">
      <span
        class="column-item--title"
        :style="boldTitle?'font-weight:bold':''"
        v-if="!superTitle"
      >{{title}}</span>
      <span class="column-item--supertitle" v-else>
        <span>{{title}}</span>
      </span>
    </div>
    <div class="column-item--body" :style="bodyStyle">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "ColumnItem",

  props: {
    title: String,
    width: {},
    vertical: Boolean,
    superTitle: Boolean,
    boldTitle: Boolean,
    smallTitle: Boolean,
    headerStyle: {},
    bodyStyle: {},
    splitOnBody: Boolean,
    splitLine: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    style() {
      return {
        flex: this.width
        // width: this.width
      };
    }
  }
};
</script>