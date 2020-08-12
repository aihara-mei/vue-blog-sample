import Vue from 'vue'
import router from '../router'

export default {
    state: {
        user: {}
    },
    actions: {
        login ({commit}, payload) {
            return Vue.http.post('/api/login', payload).catch((err) => { console.log(err) })
        },
        resetUser ({commit}, payload) {
            return Vue.http.post('/api/user', payload)
                .then(() => {
                    commit('unset_user')
                    router.go({name: 'login'})
                }).catch((err) => { console.log(err) })
        }
    },
    mutations: {
        set_user: (state, user) => {
            localStorage.setItem('token', user.token)
            localStorage.setItem('userName', user.name)
            state.user = user
        },
        unset_user: (state) => {
            localStorage.removeItem('token')
            localStorage.removeItem('userName')
            state.user = {}
        }
    }
}