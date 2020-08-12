import Vue from 'vue'
import router   from '../router'

export default {
    state: {
        article: {},
        articles: {},
        tagsAll: [],
        tags: []
    },
    actions: {
        saveArticle ({state, commit}) {
            return Vue.http.post('/api/article', state.article)
                .then(() => {
                    router.push({name: 'home'})
                }, () => { alert('Fail in saving') }).catch((err) => { console.log(err) })
        },
        getAllArticles ({commit}, payload) {
            return Vue.http.get('/api/articles', {params: {payload}})
                .then(response => response.json())
                .then(articles => {
                    commit('set_all_articles', articles)
                }).catch((err) => { console.log(err) })
        },
        getArticle ({commit, state}, aid) {
            return Vue.http.get('/api/article/' + aid)
                .then(response => {
                    commit('set_article', response.data)
                    document.title = state.article.title
                }).catch((err) => { console.log(err) })
        },
        getAllTags ({commit}) {
            return Vue.http.get('/api/tags')
                .then(response => {
                    commit('set_tags', response.data)
                }).catch((err) => { console.log(err) })
        }
    },
    mutations: {
        set_tags: (state, tags) => {
            state.tags = tags
        },
        set_tagsAll: (state, tags) => {
            state.tagsAll = tags
        },
        set_article: (state, article) => {
            state.article = article
        },
        set_all_articles: (state, articles) => {
            state.articles = articles
        },
        update_post_title: (state, title) => {
            state.article.title = title
        },
        update_post_content: (state, content) => {
            state.article.content = content
        },
        update_post_tags: (state, tags) => {
            state.article.tags = tags
        }
    }
}