<template>
    <div id="app">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script>
  import Header from './components/templates/Header'
  import Footer from './components/templates/Footer'

  export default {
    components: {
      Header,
      Footer
    }
  }

</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>