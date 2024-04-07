<script>
export default {
  name: "PlainCard",
  props: ['objects'],
  methods: {
    viewCourseLessons(courseId) {
      this.$router.push({name: "CoursePage", params: { courseId: courseId }})
    }
  }
}

</script>

<template>
  <div class="container">
    <div class="card mb-2" v-for="object in this.objects" :key="object.id">
      <div class="card-header fw-bold">
        {{ object.title }}
      </div>
      <div class="card-body">
        <p class="card-text">{{ object.description }}</p>
        <div class="row-cols-3 text-center">
          <a class="btn btn-primary m-1" @click="viewCourseLessons(object.id)">Подробнее</a>
          <a href="#" class="btn btn-success m-1">Записаться на курс</a>
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped>

</style>