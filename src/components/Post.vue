<template>
    <div class="container">
        <div class="wrapper col-lg-8 col-md-10 mx-auto">
            <div class="form-group">
                <label for="usr">Title:</label>
                <input type="text" class="form-control" placeholder="Article Title" v-model="pTitle">
            </div>
            <div class="form-group">
                <label for="usr">Tags:</label>
                <input type="text" class="form-control" placeholder="Tags with ',' in-between" v-model="pTags">
            </div>
            <div class="form-group">
                <label for="comment">Content:</label>
                <textarea class="form-control" v-model="pContent" placeholder="Input the content" rows="5"></textarea>
            </div>
            <button class="btn btn-primary btn-block" @click="postArticle"><span>Post</span></button>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    data () {
        return {
            pTitle: '',
            pContent: '',
            pTags: ''
        }
    },
    created () {
        this.set_article({
            content: '',
            title: '',
            tags: ['']
        })
    },
    computed: {
        ...mapState(['article']),
    },
    methods: {
        ...mapMutations(['set_article', 'update_post_content', 'update_post_title', 'update_post_tags']),
        ...mapActions(['saveArticle']),
        postArticle() {
            this.update_post_title(this.pTitle)
            this.update_post_content(this.pContent)
            this.update_post_tags(this.pTags.split(','))
            this.$store.dispatch('saveArticle')
        }
    }
}
</script>

<style>
.wrapper{
    margin-top: 2em;
}
</style>