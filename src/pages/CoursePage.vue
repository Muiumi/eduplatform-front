<script>
import Header from "@/components/Header.vue"
import PlainCard from "@/components/PlainCard.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "CoursePage",
  components: {Footer, PlainCard, Header},
  data() {
    return {
      lessons: [
          {
            "id": 1,
            "title": "История возникновения языка Java",
            "description": "На этом уроке вы узнаете историю возникновения языка Java, кто придумал, в каком году."
          },
          {
            "id": 2,
            "title": "Примитивные типы в языке Java",
            "description": "На этом уроке вы узнаете что такое примитивные типы, и с чем их едят."
          },
          {
            "id": 3,
            "title": "Функция",
            "description": "Здесь вам предстоит узнать что такое функция, и познакомится с её синтаксисом."
          }
      ]
    }
  }


}
</script>

<template>
  <div class="root">
    <Header></Header>
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="container-sm rounded-3 p-3 mb-3 bg-light bg-opacity-25">
          <h2 class="text-light-emphasis mb-3">Название курса {{$route.params.courseId}}</h2>
          <plain-card :objects="lessons"/>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>

</template>

<style scoped>

</style>