<script>
import {globalStorage} from "@/globalStorage";

export default {
  name: "Header",
  computed: {
    getUserFullName() {
      return `${globalStorage.currenUser.surname} ${globalStorage.currenUser.firstName}`;
    }
  },
}

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-md mb-2">
      <div class="container-fluid">
        <a class="navbar-brand text-light fs-3" href="#">
          <img src="../assets/logo.png" width="50rem" height="50rem" alt="EduPlatform">
          Образовательная платформа
        </a>
        <p>Добро пожаловать, {{ getUserFullName }}</p>
        <div class="navbar-nav">
          <a class="nav-link bg-body rounded-3" aria-current="page" href="#">Личный кабинет</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>