<template>
  <div id="app">
    <div class="container-scroll">
      <Header />
      <div class="main-wrapper">
        <Nav />
        <div class="box-contents">
          <router-view />
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import Header from "@/components/Header.vue"
  import Nav from "@/components/Nav.vue"
  import Footer from "@/components/Footer.vue"
  
  export default {
    components: {
      Header,
      Nav,
      Footer
    }
  }
</script>
  
<style>
</style>
  