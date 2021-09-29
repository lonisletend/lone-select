<template>
  <div class="lone-select" :tabindex="tabindex" @blur="focus = false">
    <div
      class="selected"
      :class="{ focus: focus, 'un-focus': !focus }"
      @click="focus = !focus"
      @mousedown.prevent
      @keydown.38="optionUp"
      @keydown.40="optionDown"
      @keydown.enter="optionSelect"
    >
      <input
        type="text"
        ref="input"
        v-model="filterVal"
        :readonly="!filterable"
        :placeholder="compPlaceholder"
        @focus="filtering"
        @blur="focus = false"
      />
    </div>
    <div class="items" :class="{ 'select-hide': !focus }">
      <div
        :class="{ 'select-backed': index === backedIndex }"
        v-for="(option, index) in options"
        :key="index"
        v-show="optionVisible(index)"
        @click="selectItem(index)"
        @mousedown.prevent
      >
        <span :class="{ 'select-highlight': option[oplabel] === selected }">
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
      type: [Number, String, Array, Object],
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
    filterable: {
      type: Boolean,
      required: false,
      default: false,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      filterVal: null,
      filterChars: [],
      filterItem: null,
      selected: null,
      backedIndex: null,
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
    focus(val) {
      if (val) {
        this.$refs.input.focus();
      } else {
        this.$refs.input.blur();
        this.filterVal = this.selected;
      }
    },
    filterVal(val) {
      this.filterChars = val ? val.split("") : [];
    },
  },
  computed: {
    compPlaceholder() {
      return this.selected ? this.selected : this.placeholder;
    },
  },
  methods: {
    selectItem(index) {
      let option = this.options[index];
      this.focus = false;
      this.backedIndex = index;
      this.$emit("input", option[this.opkey]);
    },
    filtering() {
      this.filterVal = "";
    },
    optionVisible(index) {
      let option = this.options[index];
      let itemVal = option[this.oplabel].toLowerCase();
      let filterVal = this.filterVal;
      return itemVal.includes(filterVal);
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
    optionUp() {
      if (this.options.length > 0) {
        if (this.backedIndex === null || this.backedIndex === 0) {
          this.backedIndex = this.options.length - 1;
        } else {
          this.backedIndex--;
        }
        if (!this.optionVisible(this.backedIndex)) {
          this.optionUp();
        }
      }
    },
    optionDown() {
      if (this.options.length > 0) {
        if (
          this.backedIndex === null ||
          this.backedIndex === this.options.length - 1
        ) {
          this.backedIndex = 0;
        } else {
          this.backedIndex++;
        }
        if (!this.optionVisible(this.backedIndex)) {
          this.optionDown();
        }
      }
    },
    optionSelect() {
      if (this.options.length > 0 && this.backedIndex !== null) {
        this.selectItem(this.backedIndex);
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

.lone-select .selected input {
  cursor: pointer;
  color: #606266;
  font-size: 14px;
  border: 0 solid;
  outline: none;
  width: calc(100% - 4px - 2em);
}

.lone-select .selected.focus {
  border: 1px solid #2dce89;
  border-radius: 4px;
}

.lone-select .selected.un-focus:after {
  position: absolute;
  content: "";
  top: 20px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid;
  border-color: #c0c4cc transparent transparent transparent;
}

.lone-select .selected.focus:after {
  position: absolute;
  content: "";
  top: 14px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid;
  border-color: transparent transparent #c0c4cc transparent;
}

.lone-select .items {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 100;
  overflow: auto;
  max-height: 260px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  color: #606266;
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

.select-hide {
  display: none;
}

.select-highlight {
  color: #2dce89;
  /* background-color: #2dce89; */
  font-weight: 600;
}

.select-backed {
  background-color: #f5f7fa;
}
</style>
<style scoped>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track-piece {
  background-color: #fff;
  -webkit-border-radius: 0;
}

::-webkit-scrollbar-thumb {
  background-color: #ccc;
  height: 50px;
  outline-offset: -2px;
  outline: 2px solid #fff;
  -webkit-border-radius: 4px;
  border: 2px solid #fff;
}
</style>
