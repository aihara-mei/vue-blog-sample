import Vue from 'vue'
import Vuex from 'vuex'

import UserService from './UserService'
import ArticleService from './ArticleService'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ArticleService,
    UserService,
  }
})
