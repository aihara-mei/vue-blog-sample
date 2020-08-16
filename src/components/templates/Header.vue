<template>
    <div class="container-fluid coverImg">
        <nav class="navbar navbar-expand-sm">
            <ul class="navbar-nav header-navigation">
                <li class="nav-item">
                    <router-link :to="{name: 'home'}" tag="a" exact class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'post'}" tag="a" exact class="nav-link">Post</router-link>
                </li>
            </ul>
            <ul class="navbar-nav header-navigation ml-auto">
                <li class="nav-item">
                    <router-link :to="{name: 'login'}" tag="a" exact class="nav-link">Login</router-link>
                </li>
            </ul>
        </nav>
        <div class="row">
            <div class="col-lg-8 col-md-10">
                <div class="heading text-white">
                    <h1 class="display-3">VUE BLOG</h1>
                    <h2>A vue blog prototype</h2>
                    <p>Posted on August, 2020</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
            subject: '',
            content: '',
        }
    },
    computed: {

    },
    methods: {

    }
}
</script>

<style lang="less">
.header-navigation a {
    color: white;
}

.navbar a{
    font-weight: 400;
    font-size: 1.15rem;
}

.coverImg {
    background-size: cover;
    background-image: url('../../assets/cover.jpg');
}

.heading {
    text-align: center;
    padding: 20% 0;
    h1 {
        font-weight: 800;
        font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    h2 {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    p {
        font-style: italic;
        font-family: 'Lora', 'Times New Roman', serif;
    }
}
</style>