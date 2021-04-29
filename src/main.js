// main.js

import * as components from './components'

const LoneSelect = {
  install(Vue, options = {}) {
    // components
    for (const componentName in components) {
      const component = components[componentName]

      Vue.component(component.name, component)
    }
  }
}

export default LoneSelect

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(LoneSelect)
}