<template>
  <div class="lone-select" :tabindex="tabindex" @blur="focus = false">
    <div class="selected" :class="{ focus: focus }" @click="focus = !focus">
      {{ selected || placeholder }}
    </div>
    <div class="items" :class="{ loneSelectHide: !focus }">
      <div v-for="(option, i) in options" :key="i" @click="selectItem(option)">
        <span :class="{ loneSelectHighlight: option[oplabel] === selected }">
          {{ option[oplabel] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoneSelect",
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: Number,
      required: false,
      default: null,
    },
    opkey: {
      type: String,
      required: false,
      default: "key",
    },
    oplabel: {
      type: String,
      required: false,
      default: "value",
    },
    placeholder: {
      type: String,
      required: false,
      default: "请选择",
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: null,
      focus: false,
    };
  },
  mounted() {
    this.handleValue(this.value);
  },
  watch: {
    value(val) {
      this.handleValue(val);
    },
  },
  methods: {
    selectItem(option) {
      this.selected = option[this.oplabel];
      this.focus = false;
      this.$emit("input", option[this.opkey]);
    },
    handleValue(val) {
      let option = this.options.find((el) => el[this.opkey] === val);
      if (option !== undefined) {
        this.selected = option[this.oplabel];
      } else {
        this.selected = null;
        this.$emit("input", null);
      }
    },
  },
};
</script>

<style>
.lone-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 40px;
  line-height: 40px;
}

.lone-select .selected {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.lone-select .selected.focus {
  border: 1px solid #2dce89;
  border-radius: 4px;
}

.lone-select .selected:after {
  position: absolute;
  content: "";
  top: 20px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #606266 transparent transparent transparent;
}

.lone-select .items {
  color: #606266;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #e4e7ed;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  left: 0;
  right: 0;
  z-index: 100;
}

.lone-select .items div {
  color: #606266;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.lone-select .items div:hover {
  background-color: #f5f7fa;
}

.loneSelectHide {
  display: none;
}

.loneSelectHighlight {
  color: #2dce89;
  /* background-color: #2dce89; */
  font-weight: 600;
}
</style>
