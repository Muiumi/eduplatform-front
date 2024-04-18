<script>
import {globalStorageAccess} from "@/globalStorageAccess";
import {SYSTEM_ROLES} from "@/globalStorage";

export default {
  name: "StudentAnswerCard",
  mixins: [globalStorageAccess],
  props: ['studentAttempt', 'forMentorReview'],
  data() {
    return {
      mentorAnswer: '',
      studentGrade: null,
      needsRework: false,
    }
  },
  methods: {
    sendMentorReview() {
      const mentorAnswerDtoRequest = {
        grade: this.studentGrade,
        rework: this.needsRework,
        mentorAnswer: this.mentorAnswer,
      };
      fetch(`${this.$eduPlatformApi}/mentors/grades/${this.studentAttempt.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.currentUser.accessToken}`,
        },
        body: JSON.stringify(mentorAnswerDtoRequest)
      })
          .then(response => {
            if (response.ok) {
              this.$bvToast.toast("Оценка успешно отправлена.", {
                variant: "success"
              })
              console.log(`Ментор ${this.currentUser.email} успешно проверил задание`)
            } else {
              throw new Error("Некорректный ввод данных отзыва")
            }
          })
          .catch(exception => {
            console.error(`Ошибка при проверке задания студента: ${exception}`);
            this.$bvToast.toast("Произошла ошибка при проверке. Повторите попытку позже", {
              variant: "danger"
            })
          })
    },
    sendReviewAndEmitDataUpdate() {
      this.sendMentorReview();
      return this.$emit("review-success");
    }
  },
  computed: {
    isAnswerReviewed() {
      return this.studentAttempt.grade != null && this.studentAttempt.mentorAnswer != null;
    },
    canMentorReviewThisAnswer() {
      return this.currentUser.role === SYSTEM_ROLES.ROLE_MENTOR && this.forMentorReview
    },
    checkIfAdditionalInfoProvided() {
      return this.studentAttempt.lessonTitle != null && this.studentAttempt.description != null;
    }
  }
}
</script>

<template>
  <div class="bg-light border border-primary mb-3 p-3 rounded-3">
    <div v-if="checkIfAdditionalInfoProvided">
      <h2 class="display-6">Урок: {{ studentAttempt.lessonTitle }}</h2>
      <span class="form-label">Задание к уроку:</span>
      <div class="form-control mb-2">{{ studentAttempt.description }}</div>
    </div>
    <span class="form-label">Ответ студента:</span>
    <div class="form-control mb-2"> {{ studentAttempt.studentAnswer }}</div>
    <div v-if="isAnswerReviewed">
      <span class="form-label">Комментарий ментора:</span>
      <div class="form-control mb-2"> {{ studentAttempt.mentorAnswer }}</div>
      <div class="d-flex">
        <div class="me-auto p-2">
          Оценка: {{ studentAttempt.grade }}
        </div>
        <div class="p-2">
                        <span :class="[(studentAttempt.rework) ? 'text-danger': 'text-success']">
                           Статус: {{ (studentAttempt.rework) ? "необходима доработка" : "принято" }}
                        </span>
        </div>
      </div>
    </div>
    <div v-else-if="canMentorReviewThisAnswer">
      <label :for="'mentorAnswer' + studentAttempt.id" class="form-label">Введите комментарий:</label>
      <textarea class="form-control" :id="'mentorAnswer' + studentAttempt.id" v-model="mentorAnswer"></textarea>
      <label :for="'studentGrade' + studentAttempt.id" class="form-label">Поставьте оценку:</label>
      <div class="d-flex">
        <div class="me-auto p-2">
          <input type="range" class="form-range" min="1" max="10" step="1"
                 :id="'studentGrade' + studentAttempt.id" v-model="studentGrade">
          Оценка: {{ studentGrade }}
        </div>
        <div class="p-2">
          <div class="form-check form-switch">
            <label class="form-check-label" :for="'needsRework' + studentAttempt.id">Доработать?</label>
            <input class="form-check-input" type="checkbox" role="switch"
                   :id="'needsRework' + studentAttempt.id" @click="needsRework = !needsRework">
          </div>
        </div>
      </div>
      <div class="row-cols-xxl-3 text-center">
        <button class="btn btn-primary m-lg-2" type="button" @click="sendReviewAndEmitDataUpdate">
          Отправить
        </button>
      </div>
    </div>
    <div class="text-danger" v-else>
      Ментор пока не проверил это задание!
    </div>
  </div>
</template>

<style>
.display-6 {
  font-size: 1.5rem;
  font-weight: normal;
}

</style>