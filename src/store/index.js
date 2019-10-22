import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'

Vue.use(Vuex)

// 匹配模块文件
const moduleFiles = require.context('./modules', true, /\.js$/)
const modules = moduleFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = moduleFiles(modulePath)
    modules[moduleName] = value.default;
    return modules;
}, {})
const store = new Vuex.Store({
    modules,
    getters    
})

export default store