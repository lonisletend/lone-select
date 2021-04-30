<template>
  <div>
    <lone-select :options="options" hint="请选择分类" opkey="key" oplabel="value" v-model="option"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [
        {
          key: 1,
          value: 'Java'
        },
        {
          key: 2,
          value: 'C++'
        },
        {
          key: 3,
          value: 'Go'
        },
        {
          key: 4,
          value: 'Python'
        }
      ],
      option: null
    }
  },
  watch: {
    option (val) {
      console.log(val)
    }
  }

}
</script>