<script>
import {globalStorageAccess} from "@/globalStorageAccess";

export default {
  name: "PlainCard",
  mixins: [globalStorageAccess],
  props: ['object', 'userCourses', 'onlyForPersonalAccount'],
  methods: {
    viewObjectDetails() {
      if (this.isCardForCourse) {
        Object.assign(this.currentCourse, this.object);
        sessionStorage.setItem("currentCourse", JSON.stringify(this.object));
        this.$router.push({name: "CoursePage", params: {courseId: this.currentCourse.id}});
      } else {
        Object.assign(this.currentLesson, this.object);
        sessionStorage.setItem("currentLesson", JSON.stringify(this.object));
        this.$router.push({name: "LessonPage", params: {lessonId: this.currentLesson.id}});
      }
    },
    enterOnCourse(courseId) {
      if (this.isCardForCourseAndUserNotEnteredIt) {
        fetch(`${this.$eduPlatformApi}/students/start/${courseId}`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${this.currentUser.accessToken}`,
          }
        })
            .then(response => {
              if (response.ok) {
                console.info(`Пользователь ${this.currentUser.email} поступил на курс с ID ${courseId}`);
                this.$bvToast.toast(`Вы поступили на курс ${this.object.title}!`, {
                  variant: "success"
                })
                this.userCourses.push(this.object);
              } else {
                throw new Error(`Ошибка при отправлении запроса, статус ${response.status}`);
              }
            })
            .catch(exception => {
                  console.error(`Ошибка при получении данных: ${exception}`);
                }
            )
      }
    }
  },
  computed: {
    isCardForCourse() {
      return "category" in this.object;
    },
    checkIfUserEnteredOnCourse() {
      if (this.userCourses && !this.onlyForPersonalAccount) {
        return this.userCourses.find(course => course.id === this.object.id);
      }
    },
    isCardForCourseAndUserNotEnteredIt() {
      return !this.onlyForPersonalAccount && this.isCardForCourse && !this.checkIfUserEnteredOnCourse;
    }
  }
}

</script>

<template>
  <div class="bg-light border border-primary mb-3 p-3 rounded-3">
    <div class="d-flex mb-3">
      <div class="fw-bold me-auto p-2">
        {{ object.title }}
      </div>
      <div class="fw-bold text-success p-2" v-if="checkIfUserEnteredOnCourse">
        Вы зачислены на этот курс!
      </div>
    </div>
    <div class="card-body">
      <p class="card-text">{{ object.description }}</p>
      <div class="row-cols-xxl-3 text-center">
        <a class="btn btn-primary m-1" @click="viewObjectDetails()">Подробнее</a>
        <a v-if="isCardForCourseAndUserNotEnteredIt"
           @click="enterOnCourse(object.id)"
           class="btn btn-success m-1">Поступить</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>