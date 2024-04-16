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
      lessons: [],
    }
  },

  beforeMount() {
    if (this.currentCourse.id) {
      this.getCourseLessonsById(this.currentCourse.id);
    } else {
      const courseFromSession = JSON.parse(sessionStorage.getItem("currentCourse"));
      Object.assign(this.currentCourse, courseFromSession);
      this.getCourseLessonsById(this.currentCourse.id);
    }
  },

  methods: {

    getCourseLessonsById(courseId) {
      fetch(`${this.$eduPlatformApi}/courses/lessons/${courseId}`, {
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
  },
}
</script>

<template>
  <div class="root">
    <Header/>
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="container-sm rounded-3 p-3 mb-3 bg-light bg-opacity-25">
          <h2 class="text-light-emphasis mb-3"> {{ currentCourse.title }}</h2>
          <plain-card v-for="(lesson, index) in lessons"
                      :key="index"
                      :object="lesson"
                      :only-for-personal-account="false"
          >
          </plain-card>

        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style scoped>

</style>