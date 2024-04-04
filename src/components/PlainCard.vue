<script>
export default {
  name: "PlainCard",
  props: ['data']
}

</script>

<template>
  <div class="container">
    <div class="card mb-2" v-for="item in this.data">
      <div class="card-header fw-bold">
        {{ item.title }}
      </div>
      <div class="card-body">
        <p class="card-text">{{ item.description }}</p>
        <div class="row-cols-3 text-center">
          <a href="#" class="btn btn-primary m-1">Подробнее</a>
          <a href="#" class="btn btn-success m-1">Записаться на курс</a>
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped>

</style>