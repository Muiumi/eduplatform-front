<script>
import PlainCard from "@/components/PlainCard.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import LessonTaskCard from "@/components/LessonTaskCard.vue";

export default {
  name: "LessonPage",
  components: {LessonTaskCard, Header, Footer, PlainCard},
  computed: {
    currentLesson() {
      return this.$globalStorage.currentLesson;
    },
  },
}

</script>

<template>
  <div class="root">
    <Header></Header>
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="container-sm rounded-3 p-3 mb-3 bg-light bg-opacity-25">
          <h2 class="text-light-emphasis mb-3">{{ currentLesson.title }}</h2>
          <div class="container rounded-3 p-3 bg-light">
            <h2 class="display-6 m-3">Содержимое урока</h2><hr>
            {{currentLesson.description}}
            <h2 class="display-6 m-3">Задание к уроку</h2><hr>
            <lesson-task-card :lesson="currentLesson"></lesson-task-card>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>