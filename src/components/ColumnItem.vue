<template>
  <div class="column-item" :class="['column-item--'+direction,smallTitle?'column-item--sm-title':'']" :style="style">
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
    direction: {
      type: String,
      default: "vertical"
    },
    superTitle: Boolean,
    boldTitle: Boolean,
    smallTitle: Boolean,
    headerStyle: {},
    bodyStyle: {}
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