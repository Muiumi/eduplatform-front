<script>
export default {
  name: "SearchPanel",
  data() {
    return {
    }

  },
}

</script>

<template>
  <!--TODO Слово ПОИСК не изменяет размеры-->
  <div class="root">
    <div class="container-sm rounded-3 p-3 mb-3 bg-light bg-opacity-25">
      <label for="exampleFormControlInput1" class="form-label text-uppercase fs-2 fw-semibold">Поиск</label>
      <div class="card">
        <div class="m-3">
          <input type="text" class="form-control mb-3" id="exampleFormControlInput1" placeholder="Искомый объект">
          <button type="button" class="btn btn-success">Найти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>