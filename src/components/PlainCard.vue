<script>
import {globalStorageAccess} from "@/globalStorageAccess";

export default {
  name: "PlainCard",
  mixins: [globalStorageAccess],
  props: ['object'],
  methods: {
    viewObjectDetails(objectId) {
      if (this.isCardForCourse) {
        Object.assign(this.currentCourse, this.object);
        this.$router.push({name: "CoursePage", params: {courseId: objectId}});
      } else {
        Object.assign(this.currentLesson, this.object);
        this.$router.push({name: "LessonPage", params: {lessonId: objectId}});
      }
    },
    enterOnCourse(courseId) {
      if (this.isCardForCourse) { //TODO добавить проверку того записан ли пользователь на курс
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
                return response.json();
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
  }
}

</script>

<template>
  <div class="container bg-light mb-3 p-3 rounded-3">
    <div class="card-header fw-bold">
      {{ object.title }}
    </div>
    <div class="card-body">
      <p class="card-text">{{ object.description }}</p>
      <div class="row-cols-xxl-3 text-center">
        <a class="btn btn-primary m-1" @click="viewObjectDetails(object.id)">Подробнее</a>
        <a v-if="isCardForCourse" @click="enterOnCourse(object.id)"
           class="btn btn-success m-1">Поступить</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>