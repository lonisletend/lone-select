// main.js

import * as components from "./components";

const LoneSelectLib = {
  install(Vue) {
    for (const componentName in components) {
      const component = components[componentName];
      Vue.component(component.name, component);
    }
  },
};

export default LoneSelectLib;

if (typeof window !== undefined && window.Vue) {
  window.Vue.use(LoneSelectLib);
}
