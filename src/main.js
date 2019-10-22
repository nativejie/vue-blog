import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css' 
import './utils/log' // error log
import * as filters from './filters'
import './permission'
import './styles/markdown.min.css'
import './styles/highlight.min.css'
import './styles/highlight.min.js'
import './styles/katex.min.js'
// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
import 'mavon-editor/dist/css/index.css'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(iView, {
  transfer: true,
  size: 'large',
  select: {
      arrow: 'md-arrow-dropdown',
      arrowSize: 20
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
