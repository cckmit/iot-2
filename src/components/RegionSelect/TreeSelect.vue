<template>
  <div class="region-select">
    <el-popover
      placement="bottom-start"
      popper-class="region__popper"
      v-model="showPop"
      :disabled="disabled"
      transition="el-zoom-in-top"
      trigger="click"
    >
      <div
        slot="reference"
        class="el-select el-select--small"
        @mouseenter="isHovered=true"
        @mouseleave="isHovered=false"
      >
        <span slot="reference" class="region-select--reference">
          区域选择
          <i class="el-icon-caret-bottom"></i>
        </span>

        <!-- <slot :value="multiple?selectedArray:selectedName">
          <div class="el-select__tags" v-if="multiple">
            <span>
              <el-tag
                v-for="i in selectedArray"
                type="info"
                size="mini"
                :key="i[nodeKey]"
                closable
                @close="closeTag(i)"
              >{{i[props.label]}}</el-tag>
            </span>
          </div>
          <div class="el-input el-input--small el-input--suffix" :class="{'is-disabled':disabled}">
            <input
              v-if="!multiple"
              type="text"
              :value="selectedName"
              readonly="readonly"
              autocomplete="off"
              :placeholder="placeholder"
              class="el-input__inner"
            />
            <input
              v-else
              type="text"
              readonly="readonly"
              autocomplete="off"
              class="el-input__inner"
              :placeholder="(selectedArray && selectedArray.length>0)?'':placeholder"
            />
            <span class="el-input__suffix">
              <span class="el-input__suffix-inner">
                <i
                  class="el-select__caret el-input__icon el-icon-arrow-up"
                  v-if="!isHovered || !vValue"
                  :class="{'is-reverse':showPop}"
                ></i>
                <i
                  class="el-select__caret el-input__icon el-icon-circle-close"
                  v-if="isHovered && vValue"
                  @click.stop="deleteValue"
                ></i>
              </span>
            </span>
          </div>
        </slot>-->
      </div>

      <el-scrollbar
        :native="false"
        wrap-style="max-height:3rem;min-height:1.5rem;"
      >
        <el-tree
          :data="treeDataSource"
          class="region-select--main el-treeselect--tree"
          show-checkbox
          :expand-on-click-node="false"
          :check-on-click-node="true"
          :default-expand-all="defaultExpandAll"
          :default-checked-keys="defaultCheckedKeys"
          :node-key="nodeKey"
          ref="tree"
          :indent="indent"
          highlight-current
          @check="handleCheck"
          :props="props"
        ></el-tree>
      </el-scrollbar>
    </el-popover>
  </div>
</template>

<script>
import { getTreeByArr } from "./utils";
import emitter from "element-ui/src/mixins/emitter";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "TreeSelect",

  mixins: [emitter],

  props: {
    value: {},

    valueType: {
      type: String,
      default: "string"
    },

    multiple: Boolean,

    url: String,

    data: Array,

    flatData: {
      type: Boolean,
      default: true
    },

    placeholder: {
      type: String,
      default: "请选择"
    },

    props: {
      type: Object,
      default() {
        return {
          label: "label",
          parent: "ParentId"
        };
      }
    },

    rootId: {},

    nodeKey: {
      type: String,
      default: "id"
    },

    defaultExpandAll: {
      type: Boolean,
      default: true
    },

    disabled: Boolean,

    nodeFormatter: Function,

    validateEvent: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      asyncData: [],

      flatDataSource: [],

      vValue: this.value,

      defaultCheckedKeys: [],

      selectedName: "",

      selectedArray: [],

      showPop: false,

      isHovered: false
    };
  },

  computed: {
    ...mapState({
      HtmlFontSize: state => state.HtmlFontSize
    }),
    stringValue() {
      return this.valueType === "string";
    },

    objectValue() {
      return this.valueType === "object";
    },

    checkedTreeItems() {
      if (this.stringValue) {
        return this.$refs.tree.getCheckedKeys();
      } else if (this.objectValue) {
        return this.$refs.tree.getCheckedNodes();
      } else {
        return [];
      }
    },

    treeDataSource() {
      if (this.url) {
        return this.asyncData;
      } else {
        if (this.flatData) {
          return getTreeByArr(
            this.data,
            this.rootId || null,
            this.nodeKey,
            this.props.parent,
            "children"
          );
        } else {
          return this.data || [];
        }
      }
    },

    indent() {
      if (this.HtmlFontSize) {
        return Number(((this.HtmlFontSize / 100) * 16).toFixed(2));
      } else {
        return 48;
      }
    }
  },

  watch: {
    value(val) {
      this.vValue = val;
    },

    vValue(val, oldVal) {
      this.$emit("input", val);

      this.$emit("change", val, oldVal);

      if (this.validateEvent) {
        this.dispatch("ElFormItem", "el.form.change", [val]);
      }

      this.setTreeValue(val);

      if (!this.multiple) {
        this.selectedName = (this.$refs.tree.getCheckedNodes() || [])
          .map(i => i[this.props.label])
          .join(",");
      } else {
        this.selectedArray = this.$refs.tree.getCheckedNodes() || [];
      }
    }
  },

  methods: {
    init() {
      this.setDefaultCheckedKeys();
      // this.setDefaultCheckedName();
    },

    setDefaultCheckedKeys() {
      let arr = [];

      if (this.stringValue) {
        arr = Array.isArray(this.value) ? this.value : [this.value];
      } else if (this.objectValue) {
        if (this.value) {
          if (Array.isArray(this.value)) {
            arr = this.value.map(i => i[this.nodeKey]);
          } else {
            arr = this.value[this.nodeKey];
          }
        }
      }

      this.defaultCheckedKeys = arr;
    },

    setDefaultCheckedName() {
      if (!this.multiple) {
        let checkedNodes = this.$refs.tree.getCheckedNodes();
        this.selectedName = checkedNodes
          .map(i => i[this.props.label])
          .join(",");
      } else {
        let checkedNodes = this.$refs.tree.getCheckedNodes();
        this.selectedArray = checkedNodes || [];
      }
    },

    refresh() {
      if (this.url) {
        this.getAsyncData();
      }
    },

    setTreeValue(val) {
      let arr =
        Object.prototype.toString.call(val) !== "[object Array]" ? [val] : val;

      if (this.stringValue) {
        this.$refs.tree.setCheckedKeys(arr);
      } else if (this.objectValue) {
        this.$refs.tree.setCheckedNodes(arr);
      }
    },

    getTreeValue() {
      if (this.multiple) {
        return this.checkedTreeItems;
      } else {
        return this.checkedTreeItems[0];
      }
    },

    handleCheck(checkedNode, obj) {
      if (!this.multiple) {
        if (obj.checkedKeys.length === 0) {
          this.vValue = "";
        } else {
          this.vValue = checkedNode[this.nodeKey];
        }
        this.showPop = false;
      } else {
        this.vValue = this.getTreeValue();
      }
    },

    getAsyncData() {
      axios.get(this.url).then(res => {
        const data = res.data;

        try {
          if (this.flatData) {
            this.asyncData = getTreeByArr(
              data.rows,
              this.rootId || null,
              this.nodeKey,
              this.props.parent,
              "children"
            );
            // console.log(this.asyncData)

            this.flatDataSource = data.rows;

            this.$emit("load-success", this.data);
          } else {
            this.asyncData = data.rows;
          }
        } catch (e) {
          this.asyncData = [];
        }

        this.$nextTick().then(() => {
          this.setDefaultCheckedName();
        });
      });
    },

    deleteValue() {
      if (!this.multiple) {
        this.vValue = "";
      } else {
        this.vValue = [];
      }
    },

    closeTag(tag) {
      this.vValue = this.vValue.filter(
        i => (this.stringValue ? i : i[this.nodeKey]) !== tag[this.nodeKey]
      );
    }
  },

  mounted() {
    if (this.url) {
      this.getAsyncData();
    }
    this.init();
  }
};
</script>
