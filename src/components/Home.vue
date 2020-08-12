<template>
    <div class="container">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="articleArea">
          <div v-for="(article, index) in articles" :key="(article, index)">
            <div class="row">
              <router-link :to="{name: 'article', params: {aid: article.aid}}" tag="p" exact class="articlesTitle">{{article.title}}</router-link>
              <p class="content">{{article.content | toContent}}</p>
              <span class="postInfo">Posted on {{article.date | toDate}} TAGS {{article.tags | toTags}}</span>
            </div>
            <hr/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data () {
        return {
            subject: '',
            content: '',
        }
    },
    filters: {
      toTags: (arr) => { if (arr) { return arr.join(',') } },
      toContent: function(content) {
          return content.slice(0, 100) + '...'
      }
    },
    created () {
        this.$store.dispatch('getAllArticles', {page: 1, limit: 3})
        // console.log(this.$store.state.ArticleService.articles)
    },
    computed: {
        ...mapState({
          'articles': state => state.ArticleService.articles
          })
    }
}
</script>

<style>
.articleArea {
  margin-top: 50px;
}

.articlesTitle {
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 3em;
  font-weight: 800;
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;;
}

.articlesTitle:hover {
  cursor: pointer;
  color: #0085A1;
}

.content {
  font-size: 1.75em;
  font-weight: 300;
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;;
}

.postInfo {
  font-style: italic;
  font-family: 'Lora', 'Times New Roman', serif;
  color: #868e96;
}
</style>