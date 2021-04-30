<template>
  <div class="lone-select" :tabindex="tabindex" @blur="focus = false">
    <div class="selected" :class="{ focus: focus }" @click="focus = !focus">{{ selected || hint }}</div>
    <div class="items" :class="{ selectHide: !focus }">
      <div
        v-for="(option, i) in options" :key="i"
        @click="selected = option[oplabel]; focus = false; $emit('input', option[opkey]);">
      <span :class="{ selectHighlight: (option[oplabel]===selected) }">{{ option[oplabel] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoneSelect',
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: false,
      default: null
    },
    opkey: {
      type: String,
      required: false,
      default: 'id'
    },
    oplabel: {
      type: String,
      required: false,
      default: 'name'
    },
    hint: {
      type: String,
      required: false,
      default: '请选择'
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      selected: null,
      focus: false
    }
  },
  mounted () {
    console.log(this.options)
    if (this.value !== null) {
      let selected = this.options.find(el => el[this.opkey] === this.value)
      this.selected = selected[this.oplabel] || null
      this.$emit('input', this.selected[this.opkey])
    }
  }
}
</script>

<style scoped>
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
  border: 1px solid #409eff;
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
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
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

.selectHide {
  display: none;
}

.selectHighlight {
  color: #409eff;
  /* background-color: #409eff; */
  font-weight: 600;
}
</style>