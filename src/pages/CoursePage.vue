<script>
import Header from "@/components/Header.vue"
import PlainCard from "@/components/PlainCard.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "CoursePage",
  components: {Footer, PlainCard, Header},
  data() {
    return {
      lessons: []
    }
  },
  computed: {
    currentCourse() {
      return this.$globalStorage.currentCourse;
    }
  },
  mounted() {
    fetch(`${this.$eduPlatformApi}/courses/lessons/${this.currentCourse.id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.$cookies.get("accessToken")}`,
      },
    })
        .then(response => response.json())
        .then(data => {
          this.lessons = data;
        })
        .catch((exception => {
              console.error(`Ошибка при получении данных: ${exception}`);
              // TODO сделать уведомление для пользователя?
            })
        );
  }


}
</script>

<template>
  <div class="root">
    <Header></Header>
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="container-sm rounded-3 p-3 mb-3 bg-light bg-opacity-25">
          <h2 class="text-light-emphasis mb-3"> {{ currentCourse.title }}</h2>
          <plain-card v-for="(lesson, index) in lessons"
                      :key="index"
                      :object="lesson"
          >
          </plain-card>

        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>

</template>

<style scoped>

</style>