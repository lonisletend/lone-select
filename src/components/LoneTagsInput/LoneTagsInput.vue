<template>
  <div class="tag-input">
    <div v-for="(tag, index) in tags" :key="index" class="tag-input__tag">
      {{ tag }}
      <span @click="removeTag(index)">×</span>
    </div>
    <input
      type="text"
      :placeholder="placeholder"
      class="tag-input__text"
      @keydown.enter="addTag"
      @keydown.188="addTag"
      @keydown.delete="removeLastTag"
    />
  </div>
</template>
<script>
export default {
  name: "LoneTagsInput",
  props: {
    tags: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: "请输入",
    },
  },
  data() {
    return {
      // tags: ["hello", "world"],
    };
  },
  methods: {
    addTag(event) {
      event.preventDefault();
      var val = event.target.value.trim();
      if (val.length > 0 && this.notInTags(val)) {
        this.tags.push(val);
      }
      event.target.value = "";
    },
    notInTags(tag) {
      return this.tags.indexOf(tag) < 0;
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1);
      }
    },
  },
};
</script>
<style>
.tag-input {
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  font-size: 0.9em;
  box-sizing: border-box;
  padding: 0 10px;
}

.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #eee;
  margin-top: 5px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input__text {
  width: 60px;
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 38px;
  background: none;
}
</style>
