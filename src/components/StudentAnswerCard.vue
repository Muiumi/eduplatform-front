<script>
export default {
  name: "StudentAnswerCard",
  props: ['studentAttempt'],
  data() {
    return {

    }
  },
  computed: {
    isAnswerReviewed() {
      return this.studentAttempt.grade != null && this.studentAttempt.mentorsAnswer != null;
    }
  }
}

</script>

<template>
  <div class="border border-primary bg-primary-subtle p-3 rounded-3 mb-3">
    <span class="form-label">Ваш ответ:</span>
    <div class="form-control mb-2"> {{ studentAttempt.studentAnswer }}</div>
    <div v-if="isAnswerReviewed">
      <span class="form-label">Комментарий ментора:</span>
      <div class="form-control mb-2"> {{ studentAttempt.mentorsAnswer }}</div>
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
    <div class="text-danger" v-else>
      Ментор пока не проверил это задание!
    </div>
  </div>
</template>

<style>

</style>