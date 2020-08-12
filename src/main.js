import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('toDate', (date) => {
  if (date) {
      const d = new Date(date)
      const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
      const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
      return  (d.getMonth() + 1) + '-' + 
          d.getDate() + ', ' +  d.getFullYear() + ' ' + hours + ':' + minutes
  }
})

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  if (window.localStorage.getItem('token')) {
      request.headers.set('authorization', window.localStorage.getItem('token'))
  }
  next((response) => {
      if (response.status === 401) {
          store.commit('unset_user')
          router.go({name: 'login'})
      }
      return response
  })
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
