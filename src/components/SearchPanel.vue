<script>
import {globalStorageAccess} from "@/globalStorageAccess";

export default {
  name: "SearchPanel",
  mixins: [globalStorageAccess],

  data() {
    return {
      objectToSearch: null
    }
  },
  methods: {
    filterItems() {
      return this.$emit("search", this.objectToSearch);
    }
  }
}
</script>

<template>
  <div class="root">
    <div class="container-sm rounded-3 p-3 mb-3 bg-light bg-opacity-25">
      <label for="exampleFormControlInput1" class="form-label text-uppercase fs-2 fw-semibold">Поиск</label>
      <div class="card">
        <div class="m-3">
          <input type="text" class="form-control mb-3" id="exampleFormControlInput1" placeholder="Искомый объект"
                 v-model="objectToSearch" @input="filterItems">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>