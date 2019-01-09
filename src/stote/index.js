import Vue from 'vue'
import Vuex from 'vuex'
import vueGlobal from './modules/Global';
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    vueGlobal
  },
  // strict: debug,
  plugins: debug ? [createLogger()] : []
})
