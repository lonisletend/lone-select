// main.js

import * as components from './components'

const LoneSelectLib = {
  install(Vue, options = {}) {
    // components
    console.log(components)
    for (const componentName in components) {
      console.log(componentName)
      const component = components[componentName]

      Vue.component(component.name, component)
    }
  }
}

export default LoneSelectLib

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(LoneSelectLib)
}