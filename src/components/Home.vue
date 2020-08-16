<template>
    <div class="container">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="articleArea">
          <transition-group name="fade">
          <div v-for="(article, index) in articles" :key="(article, index)">
            <div class="row" v-if="show[index]">
              <router-link :to="{name: 'article', params: {aid: article.aid}}" tag="p" exact class="articlesTitle">{{article.title}}</router-link>
              <p class="content">{{article.content | toContent}}</p>
              <span class="postInfo">Posted on {{article.date | toDate}} TAGS {{article.tags | toTags}}</span>
            </div>
            <hr/>
          </div>
          </transition-group>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex'

export default {
    data () {
        return {
            subject: '',
            content: '',
            show: Array.from({length: 5}, () => false)
        }
    },
    filters: {
      toTags: (arr) => { if (arr) { return arr.join(',') } },
      toContent: function(content) {
          return content.slice(0, 100) + '...'
      }
    },
    created() {
        this.$store.dispatch('getAllArticles', {page: 1, limit: 3})
        // console.log(this.$store.state.ArticleService.articles)
    },
    mounted() {
      let self = this
      async function one2FiveInAsync() {
        for(let i = 0; i < 5; i++) {
          self.$set(self.show, i, true)
          await new Promise(resolve => { setTimeout(resolve, 400) })
        }
      }
      one2FiveInAsync()
    },
    computed: {
        ...mapState({
          'articles': state => state.ArticleService.articles
          })
    }
}
</script>

<style lang="less">
@import "./utils/less/anime.less";

.articleArea {
  margin-top: 50px;
}

.articlesTitle {
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 3rem;
  font-weight: 800;
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;

  &:hover {
    cursor: pointer;
    color: #0085A1;
  }
}

.content {
  font-size: 1.75rem;
  font-weight: 300;
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;;
}

.postInfo {
  font-style: italic;
  font-family: 'Lora', 'Times New Roman', serif;
  color: #868e96;
}
</style>