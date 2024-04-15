<script>
import Header from "@/components/Header.vue"
import PlainCard from "@/components/PlainCard.vue";
import Footer from "@/components/Footer.vue";
import {globalStorageAccess} from "@/globalStorageAccess";

export default {
  name: "CoursePage",
  components: {Footer, PlainCard, Header},
  mixins: [globalStorageAccess],
  data() {
    return {
      lessons: []
    }
  },
  mounted() {
    fetch(`${this.$eduPlatformApi}/courses/lessons/${this.currentCourse.id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.currentUser.accessToken}`,
      },
    })
        .then(response => response.json())
        .then(responseContent => {
          this.lessons = responseContent;
        })
        .catch((exception => {
              console.error(`Ошибка при получении данных: ${exception}`);
              this.$bvToast.toast("Произошла ошибка при получении данных с сервера.", {
                variant: "danger"
              })
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