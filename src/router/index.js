import Vue from 'vue'
import VueRouter from 'vue-router'

import Article from '../components/Article.vue'
import Post from '../components/Post.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name:'home',  component: Home },
  { path: '/article/:aid', name:'article', component: Article, props: true },
  { path: '/post', name:'post',  component: Post },
  { path: '/login', name:'login',  component: Login },
  { path: '/404', name: '404', component: NotFound },
  { path: '*', redirect: '/404'}
]

export default new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})