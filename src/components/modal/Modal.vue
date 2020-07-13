<template>
  <div class="modals" :class="FooterBoxVisible?'':'lg'">
    <el-dialog
      :style="{color:'red'}"
      top="7vh"
      :custom-class="'modal--'+modal.placement"
      v-for="modal in modal_list"
      :key="modal.id"
      :modal="false"
      :title="modal.title"
      :visible="modal.visible"
      :width="getModalWidth(modal)"
      :before-close="getBeforeClose(modal)"
      @close="onClose(modal)"
      @closed="onClosed(modal)"
    >
      <template #title>
        <svg
          class="svg-title"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 178 25"
        >
          <g class="cls-1">
            <image
              class="cls-2"
              width="178"
              height="25"
              xlink:href="data:image/png;base64,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"
            />
            <path
              class="cls-3"
              d="M23.71,15.42l-13.08-4c-1.44-.44-1.07-2.26.46-2.26l142.7,0a1.43,1.43,0,0,1,.46.07l13.08,4c1.44.44,1.07,2.25-.46,2.25l-142.7,0A1.76,1.76,0,0,1,23.71,15.42Z"
            />
          </g>
        </svg>
      </template>

      <component
        :ref="'modalComponent_'+modal.id"
        :is="modal.component"
        v-bind="modal.data"
        v-on="modal.actions"
      ></component>

      <template #footer>
        <el-button
          v-for="(btn,index) in modal.btns"
          :key="index"
          size="mini"
          :type="btn.type"
          @click="onModalBtnClick(btn,modal)"
        >{{btn.name}}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      globalDialog: {
        title: "Global Dialog",
        visible: false
      }
    };
  },

  computed: {
    ...mapState({
      modal_list: state => state.modal.modal_list,
      FooterBoxVisible: state => state.FooterBoxVisible
    })
  },

  methods: {
    getModalWidth(modal) {
      const { width, placement } = modal;
      if (width) {
        return width;
      } else {
        if (placement === "top-right") {
          return "25vw";
        } else if (placement === "center") {
          return "40vw";
        }
      }
    },

    onClose(modal) {
      this.$store.dispatch("modal/close", modal.id);
    },

    onClosed(modal) {
      this.$store.dispatch("modal/remove", modal.id);
    },

    getBeforeClose(modal) {
      const _this = this;
      return function(done) {
        if (!modal.beforeClose) {
          done();
        } else {
          modal.beforeClose(done, _this.$refs[`modalComponent_${modal.id}`][0]);
        }
      };
    },

    //弹窗按钮点击
    onModalBtnClick(btn, modal) {
      const { method, callback } = btn;

      if (!method) {
        this.onClose(modal);
        return;
      }

      //弹窗内实例组件上下文对象
      const ctx = this.$refs[`modalComponent_${modal.id}`][0];

      ctx && ctx[method] && ctx[method].call(null, callback);
    }
  },

  created() {}
};
</script>

<style scoped>
.cls-1 {
  isolation: isolate;
}
.cls-2 {
  opacity: 0.65;
  mix-blend-mode: screen;
}
.cls-3 {
  fill: #71b2ff;
}
</style>