import { defineAsyncComponent } from 'vue'

export const pagesComponents = {
  "/": defineAsyncComponent(() => import(/* webpackChunkName: "v-8daa1a0e" */"/home/yangxj/workspace/lone-select/docs/.vuepress/.temp/pages/index.html.vue")),
  "/guide.html": defineAsyncComponent(() => import(/* webpackChunkName: "v-5d7259d4" */"/home/yangxj/workspace/lone-select/docs/.vuepress/.temp/pages/guide.html.vue")),
  "/404.html": defineAsyncComponent(() => import(/* webpackChunkName: "v-3706649a" */"/home/yangxj/workspace/lone-select/docs/.vuepress/.temp/pages/404.html.vue")),
}
