<script>
import PlainCard from "@/components/PlainCard.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

export default {
  name: "LessonPage",
  components: {Header, Footer, PlainCard}
}

</script>

<template>
  <div class="root">
    <Header></Header>
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="container-sm rounded-3 p-3 mb-3 bg-light bg-opacity-25">
          <h2 class="text-light-emphasis mb-3">Название урока</h2>
          <div class="container rounded-3 p-3 bg-light">

          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>