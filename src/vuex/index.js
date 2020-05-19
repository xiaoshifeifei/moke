import Vue from 'vue'
import Vuex from 'vuex'
import state from '@/vuex/state'
import actions from '@/vuex/actions'
import getters from '@/vuex/getters'
import mutations from '@/vuex/mutations'
Vue.use(Vuex)// vuex全局变量管理
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
